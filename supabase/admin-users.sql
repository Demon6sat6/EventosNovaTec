-- Tabla de usuarios administradores
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

-- Función para hashear contraseña (usa pgcrypto)
create extension if not exists pgcrypto;

-- Insertar admin inicial desde variables de entorno
-- Reemplaza 'admin@eventosapp.com' y 'Admin2024!' con tus credenciales actuales
insert into admin_users (email, password_hash, nombre, rol)
values (
  'admin@eventosapp.com',
  crypt('Admin2024!', gen_salt('bf')),
  'Administrador',
  'superadmin'
);
