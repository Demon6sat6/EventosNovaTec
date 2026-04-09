import type { APIRoute } from 'astro';
import { createServerClient } from '../../lib/supabase';

export const GET: APIRoute = async () => {
  const db = createServerClient();

  const { data, error } = await db
    .from('admin_users')
    .upsert({
      email:    'admin@eventosapp.com',
      password: 'Admin2024!',
      nombre:   'Administrador',
      rol:      'superadmin',
      activo:   true,
    }, { onConflict: 'email' })
    .select();

  return new Response(JSON.stringify({ data, error: error?.message }, null, 2), {
    headers: { 'Content-Type': 'application/json' }
  });
};
