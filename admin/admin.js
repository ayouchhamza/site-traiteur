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
  const STATUSES = [
    { id: 'nouveau', label: 'Nouveau' },
    { id: 'en_cours', label: 'En cours' },
    { id: 'traite', label: 'Traité' }
  ];
  const DAY = 86400000;
  const isPhone = () => window.matchMedia('(max-width: 899px)').matches;

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
  const startOfDay = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();

  PetiteVue.createApp({
    configured: configured,
    session: configured ? savedSession.get() : null,
    login: { user: '', pass: '' },
    loginErr: '',
    loggingIn: false,
    showPass: false,
    rows: [],
    loading: false,
    loadErr: '',
    updatedAt: null,
    filter: 'tous',
    search: '',
    sort: 'recu',
    selectedId: null,
    mobileOpen: false,
    copied: null,
    statuses: STATUSES,
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
    get weekCount() {
      const since = Date.now() - 7 * DAY;
      return this.rows.filter((r) => new Date(r.created_at).getTime() >= since).length;
    },
    get filtered() {
      const q = this.search.trim().toLowerCase();
      const list = this.rows.filter((r) => {
        if (this.filter !== 'tous' && r.statut !== this.filter) return false;
        if (!q) return true;
        return [r.nom, r.telephone, r.type_evenement, r.message, r.budget, r.invites]
          .some((v) => v && String(v).toLowerCase().includes(q));
      });
      if (this.sort === 'event') {
        // prochains événements d’abord, puis ceux sans date
        list.sort((a, b) => (a.date_evenement || '9999').localeCompare(b.date_evenement || '9999'));
      }
      return list;
    },
    get selected() {
      return this.rows.find((r) => r.id === this.selectedId) || null;
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

    countFor(id) {
      return id === 'tous' ? this.rows.length : this.counts[id];
    },
    setFilter(id) {
      this.filter = id;
      if (!isPhone() && !this.filtered.some((r) => r.id === this.selectedId)) {
        this.selectedId = this.filtered.length ? this.filtered[0].id : null;
      }
    },
    select(row) {
      this.selectedId = row.id;
      if (isPhone()) {
        this.mobileOpen = true;
        window.scrollTo(0, 0);
      }
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
        this.showPass = false;
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
        if (!this.selected && !isPhone() && this.filtered.length) this.selectedId = this.filtered[0].id;
      } catch (e) {
        this.loadErr = 'Impossible de charger les demandes : ' + e.message;
      } finally {
        this.loading = false;
      }
    },

    async setStatus(row, statut) {
      if (row.statut === statut) return;
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
      const visible = this.filtered;
      const index = visible.findIndex((r) => r.id === row.id);
      try {
        await this.api('DELETE', '?id=eq.' + encodeURIComponent(row.id));
        this.rows = this.rows.filter((r) => r.id !== row.id);
        const next = visible[index + 1] || visible[index - 1];
        this.selectedId = next && !isPhone() ? next.id : null;
        this.mobileOpen = false;
      } catch (e) {
        this.loadErr = 'La demande n’a pas pu être supprimée : ' + e.message;
      }
    },

    async copyPhone(row) {
      try {
        await navigator.clipboard.writeText(row.telephone);
        this.copied = row.id;
        setTimeout(() => { if (this.copied === row.id) this.copied = null; }, 1800);
      } catch (e) {
        window.prompt('Numéro de téléphone :', row.telephone);
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
      this.selectedId = null;
      this.mobileOpen = false;
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

    statusLabel(s) {
      const found = STATUSES.find((x) => x.id === s);
      return found ? found.label : s;
    },
    initials(name) {
      const parts = String(name || '').replace(/[^\p{L}\s'-]/gu, ' ').trim().split(/\s+/).filter(Boolean);
      // une seule lettre pour l’arabe : deux lettres isolées y deviennent illisibles en petit
      if (parts.length && /\p{Script=Arabic}/u.test(parts[0])) return parts[0][0];
      return ((parts[0] || '?')[0] + (parts.length > 1 ? parts[parts.length - 1][0] : '')).toUpperCase();
    },
    telHref(phone) { return 'tel:' + String(phone || '').replace(/[^\d+]/g, ''); },
    timeAgo(iso) {
      const t = new Date(iso).getTime();
      if (isNaN(t)) return '';
      const min = Math.round((Date.now() - t) / 60000);
      if (min < 1) return 'à l’instant';
      if (min < 60) return 'il y a ' + min + ' min';
      const h = Math.round(min / 60);
      if (h < 24 && startOfDay(new Date()) <= t) return 'il y a ' + h + ' h';
      const days = Math.round((startOfDay(new Date()) - startOfDay(new Date(t))) / DAY);
      if (days === 1) return 'hier';
      if (days < 7) return 'il y a ' + days + ' j';
      return new Date(t).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
    },
    untilLabel(iso) {
      const d = new Date(iso + 'T12:00:00');
      if (isNaN(d)) return '';
      const days = Math.round((startOfDay(d) - startOfDay(new Date())) / DAY);
      if (days === 0) return 'aujourd’hui';
      if (days === 1) return 'demain';
      if (days > 1) return 'dans ' + days + ' jours';
      return 'passée';
    },
    fmtDay(iso) {
      if (!iso) return '—';
      const d = new Date(iso + 'T12:00:00');
      return isNaN(d) ? iso : d.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
    },
    fmtDayShort(iso) {
      const d = new Date(iso + 'T12:00:00');
      return isNaN(d) ? iso : d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' });
    },
    fmtDateTime(iso) {
      const d = new Date(iso);
      return isNaN(d) ? '' : d.toLocaleString('fr-FR', { day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' });
    }
  }).mount('#admin');
})();
