import type { APIRoute } from 'astro';
import { createServerClient } from '../../lib/supabase';

export const GET: APIRoute = async () => {
  const db = createServerClient();

  // Ver todos los usuarios en la tabla
  const { data, error } = await db
    .from('admin_users')
    .select('id, email, nombre, rol, activo');

  return new Response(JSON.stringify({ data, error: error?.message }, null, 2), {
    headers: { 'Content-Type': 'application/json' }
  });
};
