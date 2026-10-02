// Connexion à Supabase, la base qui reçoit les demandes de devis (voir README).
// Valeurs dans Supabase › Project Settings › API : « Project URL » et clé « publishable » (ou « anon public »).
// Cette clé est faite pour être publique : la sécurité vient des règles de supabase/schema.sql.
// Ne jamais mettre ici la clé secrète (« sb_secret_… » ou « service_role »).
window.TR_CONFIG = {
  supabaseUrl: 'https://lbdglxtclsunppvbnaln.supabase.co',
  supabaseAnonKey: 'sb_publishable_KICDeGkfWEW5qgYESMlScg_BZWwAbMc',
  // Dans l’espace admin, un identifiant sans « @ » reçoit ce domaine : admin → admin@traiteurradi.ma
  adminEmailDomain: 'traiteurradi.ma'
};
