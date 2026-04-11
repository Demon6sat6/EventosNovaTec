import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;
const serviceRoleKey = import.meta.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Faltan variables de entorno: PUBLIC_SUPABASE_URL y PUBLIC_SUPABASE_ANON_KEY son requeridas');
}

// Cliente público (anon key) — para páginas públicas
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Cliente con privilegios — para API endpoints y páginas admin
export function createServerClient() {
  const key = serviceRoleKey || supabaseAnonKey;
  return createClient(supabaseUrl, key);
}

export type Evento = {
  id: string;
  titulo: string;
  descripcion: string;
  fecha: string;
  lugar: string;
  precio: number;
  capacidad: number;
  imagen_url: string;
  slug: string;
  publicado: boolean;
  created_at: string;
};

export type Entrada = {
  id: string;
  evento_id: string;
  nombre: string;
  email: string;
  codigo_qr: string;
  estado: 'pendiente' | 'pagado' | 'asistio' | 'cancelado';
  cantidad: number;
  total: number;
  created_at: string;
  evento?: Evento;
};
