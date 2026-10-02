-- Traiteur Radi : base des demandes de devis
-- À coller une fois dans Supabase › SQL Editor › New query, puis « Run ».
--
-- Sécurité :
--   • les visiteurs du site peuvent seulement AJOUTER une demande (jamais lire, modifier ni supprimer) ;
--   • seuls les comptes listés dans public.is_admin() peuvent lire, changer le statut et supprimer.
-- Pensez aussi à désactiver les inscriptions publiques : Authentication › Sign In / Providers › Email ›
-- décocher « Allow new users to sign up ».

create table if not exists public.devis (
  id             bigint generated always as identity primary key,
  created_at     timestamptz not null default now(),
  nom            text not null check (char_length(nom) between 1 and 120),
  telephone      text not null check (char_length(telephone) between 4 and 40),
  type_evenement text not null check (char_length(type_evenement) between 1 and 60),
  date_evenement date,
  invites        text check (char_length(invites) <= 40),
  budget         text check (char_length(budget) <= 60),
  message        text check (char_length(message) <= 2000),
  langue         text check (langue in ('fr', 'ar')),
  statut         text not null default 'nouveau' check (statut in ('nouveau', 'en_cours', 'traite'))
);

create index if not exists devis_created_at_idx on public.devis (created_at desc);

-- Comptes autorisés à voir les demandes : mettre ici l’e-mail du compte admin créé dans
-- Authentication › Users (plusieurs possibles : 'a@x.ma', 'b@x.ma').
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select coalesce(auth.jwt() ->> 'email', '') in ('admin@traiteurradi.ma');
$$;

alter table public.devis enable row level security;

drop policy if exists "Visiteurs : envoyer une demande" on public.devis;
create policy "Visiteurs : envoyer une demande" on public.devis
  for insert to anon, authenticated
  with check (statut = 'nouveau');

drop policy if exists "Admin : lire" on public.devis;
create policy "Admin : lire" on public.devis
  for select to authenticated
  using (public.is_admin());

drop policy if exists "Admin : changer le statut" on public.devis;
create policy "Admin : changer le statut" on public.devis
  for update to authenticated
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "Admin : supprimer" on public.devis;
create policy "Admin : supprimer" on public.devis
  for delete to authenticated
  using (public.is_admin());

-- Le site ne peut remplir que les champs du formulaire (pas la date de réception, le statut ni l’identifiant).
revoke all on public.devis from anon;
grant insert (nom, telephone, type_evenement, date_evenement, invites, budget, message, langue) on public.devis to anon;
