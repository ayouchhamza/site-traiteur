# Traiteur Radi — site traiteur

Site one-page d’un traiteur haut de gamme à Casablanca : mariages, fiançailles, événements d’entreprise et réceptions privées.
Pensé mobile d’abord (visiteurs venant d’Instagram), bilingue français / arabe avec mise en page de droite à gauche.

**En ligne :** https://site-traiteur-one.vercel.app/ (hébergé sur Vercel, mis à jour à chaque push sur `main`)

> ⚠️ Site de démonstration : la note moyenne, l’adresse et les avis clients sont **fictifs**.
> La page est marquée `noindex` pour ne pas apparaître dans les moteurs de recherche tant que les vraies informations ne sont pas en place.

## Contenu

Accueil · chiffres clés · prestations · galerie « Nos créations » (33 photos, filtrable) · déroulé en 3 étapes ·
témoignages · FAQ · formulaire de devis · pied de page (adresse, carte, horaires, réseaux) · bouton WhatsApp flottant.

## Structure

```
index.html        balisage de la page (gabarit petite-vue)
css/style.css     styles, responsive (container queries), animations au scroll
js/app.js         textes FR/AR, informations de l’entreprise et logique (langue, FAQ, carrousel, galerie, devis)
js/config.js      connexion à Supabase (base des demandes de devis)
admin/            espace admin : connexion et liste des demandes de devis
supabase/         schema.sql : table des devis et règles d’accès
images/           photos : galerie Traiteur Radi (radi-*.webp), accueil et prestations Unsplash
favicon.svg
```

## Modifier les informations

Tout est dans `js/app.js` :

- `facts()` : nom, ville, téléphone / WhatsApp, e-mail, compte Instagram, adresse, chiffres clés, conditions (acompte, minimum d’invités…).
- `copyFr()` et `copyAr()` : tous les textes du site, en français et en arabe.

Les avis clients sont des exemples avec des noms fictifs, signalés sur la page par la mention « Témoignages d’exemple » (`testi.note` dans `copyFr()` / `copyAr()`) : remplacer par de vrais avis, puis retirer la mention.
Restent aussi à compléter entre crochets : `[Adresse de l’atelier]` et la politique de dégustation dans la FAQ.

## Avant une vraie mise en ligne

1. Remplacer les informations fictives et les avis d’exemple par les vrais.
2. Remplacer les dernières photos Unsplash (accueil et cartes « Prestations ») par des photos de Traiteur Radi.
3. Connecter la base des demandes de devis (section suivante).
4. Intégrer la vraie carte Google Maps dans le pied de page.
5. Retirer la balise `<meta name="robots" content="noindex">` de `index.html`.

## Demandes de devis et espace admin

Le formulaire enregistre chaque demande dans une base **Supabase** (gratuite) ; on les consulte sur
**`/admin/`** (https://site-traiteur-one.vercel.app/admin/) avec un identifiant et un mot de passe.
Tant que la base n’est pas connectée, le formulaire affiche un message d’erreur avec le numéro de téléphone.

Mise en place (une seule fois) :

1. Créer un compte sur https://supabase.com, puis **New project** (région *West EU*, mot de passe de base au choix).
2. **SQL Editor › New query** : coller tout le contenu de `supabase/schema.sql`, puis **Run**.
3. **Authentication › Sign In / Providers › Email** : décocher **Allow new users to sign up** (personne d’autre ne peut créer de compte).
4. **Authentication › Users › Add user** : e-mail `admin@traiteurradi.ma`, un mot de passe solide, cocher **Auto Confirm User**.
   Dans l’espace admin, l’identifiant `admin` suffit (le domaine est ajouté automatiquement).
   Autre e-mail ? Le remplacer aussi dans `public.is_admin()` de `supabase/schema.sql`, puis relancer le script.
5. **Project Settings › API** : copier **Project URL** et la clé **publishable** (`sb_publishable_…`, ou l’ancienne clé **anon public**) dans `js/config.js`.
   Ne jamais y mettre la clé secrète (`sb_secret_…` ou `service_role`).

Dans l’espace admin : statut de chaque demande (Nouveau, En cours, Traité), recherche, filtres, suppression et export CSV pour Excel.
Les visiteurs ne peuvent qu’envoyer une demande : lire, modifier ou supprimer est réservé au compte admin (règles RLS de Supabase).

## Aperçu en local

```bash
python3 -m http.server 8000
```

puis ouvrir http://localhost:8000.

## Crédits

- Photos de la galerie : Traiteur Radi. Accueil et prestations : [Unsplash](https://unsplash.com) (licence Unsplash).
- Polices : Cormorant Garamond, DM Sans, Amiri, IBM Plex Sans Arabic (Google Fonts).
- [petite-vue](https://github.com/vuejs/petite-vue) pour l’interactivité.
