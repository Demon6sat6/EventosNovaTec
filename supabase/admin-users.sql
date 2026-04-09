-- Tabla de administradores
create table admin_users (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  password text not null,
  nombre text,
  rol text not null default 'admin' check (rol in ('admin', 'superadmin')),
  activo boolean not null default true,
  created_at timestamptz default now()
);

-- Deshabilitar RLS (acceso solo desde service role)
alter table admin_users disable row level security;

-- Insertar el admin por defecto (cambia el password si quieres)
insert into admin_users (email, password, nombre, rol)
values ('admin@eventosapp.com', 'Admin2024!', 'Administrador', 'superadmin');
