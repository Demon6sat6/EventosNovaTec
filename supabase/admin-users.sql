-- Tabla de usuarios administradores
create extension if not exists pgcrypto;

create table admin_users (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  password_hash text not null,
  nombre text,
  rol text not null default 'admin' check (rol in ('superadmin', 'admin')),
  activo boolean not null default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Solo accesible con service role
alter table admin_users enable row level security;

-- Función RPC para verificar contraseña con bcrypt
create or replace function verify_admin_password(p_email text, p_password text)
returns table(id uuid, email text, nombre text, rol text)
language plpgsql
security definer
as $$
begin
  return query
    select u.id, u.email, u.nombre, u.rol
    from admin_users u
    where u.email = p_email
      and u.activo = true
      and u.password_hash = crypt(p_password, u.password_hash);
end;
$$;

-- Función RPC para hashear contraseña
create or replace function hash_password(p_password text)
returns text
language plpgsql
security definer
as $$
begin
  return crypt(p_password, gen_salt('bf'));
end;
$$;

-- Insertar admin inicial (ajusta email y contraseña según tu .env)
insert into admin_users (email, password_hash, nombre, rol)
values (
  'admin@eventosapp.com',
  crypt('Admin2024!', gen_salt('bf')),
  'Administrador',
  'superadmin'
);
