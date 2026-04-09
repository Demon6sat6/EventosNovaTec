-- 1. Deshabilitar RLS completamente en eventos (solución directa)
alter table eventos disable row level security;

-- 2. Deshabilitar RLS en entradas también para que las APIs funcionen
alter table entradas disable row level security;
