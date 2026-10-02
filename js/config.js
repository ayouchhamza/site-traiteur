// Connexion à Supabase, la base qui reçoit les demandes de devis (voir README).
// Valeurs dans Supabase › Project Settings › API : « Project URL » et clé « anon public ».
// La clé anon est faite pour être publique : la sécurité vient des règles de supabase/schema.sql.
// Ne jamais mettre ici la clé « service_role ».
window.TR_CONFIG = {
  supabaseUrl: 'https://VOTRE-PROJET.supabase.co',
  supabaseAnonKey: 'VOTRE_CLE_ANON_PUBLIQUE',
  // Dans l’espace admin, un identifiant sans « @ » reçoit ce domaine : admin → admin@traiteurradi.ma
  adminEmailDomain: 'traiteurradi.ma'
};
