/*
 * Espace admin Traiteur Radi : connexion (Supabase Auth, e-mail + mot de passe)
 * et gestion des demandes de devis (table public.devis, protégée par supabase/schema.sql).
 */
(function () {
  const cfg = window.TR_CONFIG || {};
  const base = (cfg.supabaseUrl || '').replace(/\/$/, '');
  const anonKey = cfg.supabaseAnonKey || '';
  const configured = Boolean(base && anonKey) && !/VOTRE/.test(base + anonKey);
  const SESSION_KEY = 'tr-admin-session';
  const STATUSES = { nouveau: 'Nouveau', en_cours: 'En cours', traite: 'Traité' };

  const savedSession = {
    get() {
      try { return JSON.parse(localStorage.getItem(SESSION_KEY)); } catch (e) { return null; }
    },
    set(session) {
      try {
        if (session) localStorage.setItem(SESSION_KEY, JSON.stringify(session));
        else localStorage.removeItem(SESSION_KEY);
      } catch (e) { /* stockage indisponible : la session reste valable tant que la page est ouverte */ }
    }
  };

  async function authRequest(path, body) {
    const res = await fetch(base + '/auth/v1/' + path, {
      method: 'POST',
      headers: { apikey: anonKey, 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      const err = new Error(data.error_description || data.msg || data.message || 'Erreur ' + res.status);
      err.status = res.status;
      throw err;
    }
    return data;
  }

  const toSession = (d) => ({
    access: d.access_token,
    refresh: d.refresh_token,
    expiresAt: Date.now() + Math.max(60, (d.expires_in || 3600) - 60) * 1000,
    email: (d.user && d.user.email) || ''
  });

  const csvCell = (v) => '"' + String(v == null ? '' : v).replace(/"/g, '""') + '"';

  PetiteVue.createApp({
    configured: configured,
    session: configured ? savedSession.get() : null,
    login: { user: '', pass: '' },
    loginErr: '',
    loggingIn: false,
    rows: [],
    loading: false,
    loadErr: '',
    updatedAt: null,
    filter: 'tous',
    search: '',
    filters: [
      { id: 'tous', label: 'Toutes' },
      { id: 'nouveau', label: 'Nouvelles' },
      { id: 'en_cours', label: 'En cours' },
      { id: 'traite', label: 'Traitées' }
    ],

    get counts() {
      const c = { nouveau: 0, en_cours: 0, traite: 0 };
      this.rows.forEach((r) => { if (c[r.statut] !== undefined) c[r.statut] += 1; });
      return c;
    },
    get filtered() {
      const q = this.search.trim().toLowerCase();
      return this.rows.filter((r) => {
        if (this.filter !== 'tous' && r.statut !== this.filter) return false;
        if (!q) return true;
        return [r.nom, r.telephone, r.type_evenement, r.message, r.budget, r.invites]
          .some((v) => v && String(v).toLowerCase().includes(q));
      });
    },
    get updatedLabel() {
      return this.updatedAt ? this.updatedAt.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }) : '';
    },

    init() {
      if (this.session) this.load();
      setInterval(() => {
        if (this.session && !document.hidden && !this.loading) this.load(true);
      }, 60000);
    },

    async doLogin() {
      this.loginErr = '';
      const user = this.login.user;
      const email = user.includes('@') ? user : user + '@' + (cfg.adminEmailDomain || '');
      this.loggingIn = true;
      try {
        const data = await authRequest('token?grant_type=password', { email: email, password: this.login.pass });
        this.session = toSession(data);
        savedSession.set(this.session);
        this.login.pass = '';
        await this.load();
      } catch (e) {
        this.loginErr = e.status === 400 || e.status === 401
          ? 'Identifiant ou mot de passe incorrect.'
          : 'Connexion impossible pour le moment (' + e.message + ').';
      } finally {
        this.loggingIn = false;
      }
    },

    async accessToken() {
      if (!this.session) throw new Error('Session expirée');
      if (Date.now() > this.session.expiresAt) {
        try {
          this.session = toSession(await authRequest('token?grant_type=refresh_token', { refresh_token: this.session.refresh }));
          savedSession.set(this.session);
        } catch (e) {
          this.logout();
          throw new Error('Session expirée, reconnectez-vous.');
        }
      }
      return this.session.access;
    },

    async api(method, query, body) {
      const token = await this.accessToken();
      const res = await fetch(base + '/rest/v1/devis' + query, {
        method: method,
        headers: {
          apikey: anonKey,
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json',
          Prefer: 'return=minimal'
        },
        body: body ? JSON.stringify(body) : undefined
      });
      if (res.status === 401) {
        this.logout();
        throw new Error('Session expirée, reconnectez-vous.');
      }
      if (!res.ok) throw new Error('Erreur du serveur (' + res.status + ')');
      return method === 'GET' ? res.json() : null;
    },

    async load(silent) {
      if (!silent) this.loading = true;
      this.loadErr = '';
      try {
        this.rows = await this.api('GET', '?select=*&order=created_at.desc');
        this.updatedAt = new Date();
      } catch (e) {
        this.loadErr = 'Impossible de charger les demandes : ' + e.message;
      } finally {
        this.loading = false;
      }
    },

    async setStatus(row, statut) {
      const previous = row.statut;
      row.statut = statut;
      try {
        await this.api('PATCH', '?id=eq.' + encodeURIComponent(row.id), { statut: statut });
      } catch (e) {
        row.statut = previous;
        this.loadErr = 'Le statut n’a pas pu être modifié : ' + e.message;
      }
    },

    async remove(row) {
      if (!window.confirm('Supprimer définitivement la demande de ' + row.nom + ' ?')) return;
      try {
        await this.api('DELETE', '?id=eq.' + encodeURIComponent(row.id));
        this.rows = this.rows.filter((r) => r.id !== row.id);
      } catch (e) {
        this.loadErr = 'La demande n’a pas pu être supprimée : ' + e.message;
      }
    },

    logout() {
      if (this.session) {
        fetch(base + '/auth/v1/logout', {
          method: 'POST',
          headers: { apikey: anonKey, Authorization: 'Bearer ' + this.session.access }
        }).catch(() => {});
      }
      this.session = null;
      savedSession.set(null);
      this.rows = [];
      this.updatedAt = null;
    },

    exportCsv() {
      const head = ['Reçue le', 'Nom', 'Téléphone', 'Événement', 'Date', 'Invités', 'Budget', 'Message', 'Langue', 'Statut'];
      const lines = this.filtered.map((r) => [
        this.fmtDateTime(r.created_at), r.nom, r.telephone, r.type_evenement, this.fmtDay(r.date_evenement),
        r.invites, r.budget, r.message, r.langue, this.statusLabel(r.statut)
      ].map(csvCell).join(';'));
      const csv = '﻿' + [head.map(csvCell).join(';')].concat(lines).join('\r\n');
      const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }));
      const a = document.createElement('a');
      a.href = url;
      a.download = 'devis-traiteur-radi-' + new Date().toISOString().slice(0, 10) + '.csv';
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    },

    statusLabel(s) { return STATUSES[s] || s; },
    telHref(phone) { return 'tel:' + String(phone || '').replace(/[^\d+]/g, ''); },
    fmtDay(iso) {
      if (!iso) return '—';
      const d = new Date(iso + 'T12:00:00');
      return isNaN(d) ? iso : d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
    },
    fmtDateTime(iso) {
      const d = new Date(iso);
      return isNaN(d) ? '' : d.toLocaleString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
    }
  }).mount('#admin');
})();
