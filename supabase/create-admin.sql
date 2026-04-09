-- Ejecuta esto en el SQL Editor de Supabase para crear tu usuario admin
-- Reemplaza el email y contraseña con los que quieras usar

SELECT supabase_auth.create_user(
  '{"email": "admin@tuemail.com", "password": "TuContraseña123!", "email_confirm": true}'::jsonb
);

-- O desde el Dashboard de Supabase:
-- Authentication > Users > Add user > Create new user
