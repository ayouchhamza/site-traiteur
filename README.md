# Traiteur Radi — site traiteur

Site one-page d’un traiteur haut de gamme à Casablanca : mariages, fiançailles, événements d’entreprise et réceptions privées.
Pensé mobile d’abord (visiteurs venant d’Instagram), bilingue français / arabe avec mise en page de droite à gauche.

**En ligne :** https://ayouchhamza.github.io/site-traiteur/

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
3. Brancher le formulaire de devis (aujourd’hui il n’envoie rien : il affiche une confirmation et propose d’envoyer le récapitulatif sur WhatsApp) — par exemple Formspree, Netlify Forms ou un back-office.
4. Intégrer la vraie carte Google Maps dans le pied de page.
5. Retirer la balise `<meta name="robots" content="noindex">` de `index.html`.

## Aperçu en local

```bash
python3 -m http.server 8000
```

puis ouvrir http://localhost:8000.

## Crédits

- Photos de la galerie : Traiteur Radi. Accueil et prestations : [Unsplash](https://unsplash.com) (licence Unsplash).
- Polices : Cormorant Garamond, DM Sans, Amiri, IBM Plex Sans Arabic (Google Fonts).
- [petite-vue](https://github.com/vuejs/petite-vue) pour l’interactivité.
