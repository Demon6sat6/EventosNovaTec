-- Tabla de eventos
create table eventos (
  id uuid primary key default gen_random_uuid(),
  titulo text not null,
  slug text not null unique,
  descripcion text,
  fecha timestamptz not null,
  lugar text not null,
  precio numeric(10,2) not null default 0,
  capacidad integer not null default 100,
  imagen_url text,
  publicado boolean not null default false,
  created_at timestamptz default now()
);

-- Tabla de entradas
create table entradas (
  id uuid primary key default gen_random_uuid(),
  evento_id uuid references eventos(id) on delete cascade,
  nombre text not null,
  email text not null,
  codigo_qr text not null unique,
  cantidad integer not null default 1,
  total numeric(10,2) not null default 0,
  estado text not null default 'pendiente' check (estado in ('pendiente','pagado','asistio','cancelado')),
  created_at timestamptz default now()
);

-- Índices
create index on entradas(evento_id);
create index on entradas(codigo_qr);
create index on entradas(email);

-- RLS: permitir lectura pública de eventos publicados
alter table eventos enable row level security;
create policy "Eventos públicos" on eventos for select using (publicado = true);

-- RLS: entradas solo con service role (desde API)
alter table entradas enable row level security;
