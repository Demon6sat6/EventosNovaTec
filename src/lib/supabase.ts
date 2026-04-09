import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Server-side client con service role (solo en endpoints API)
export function createServerClient() {
  return createClient(
    import.meta.env.PUBLIC_SUPABASE_URL,
    import.meta.env.SUPABASE_SERVICE_ROLE_KEY
  );
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
