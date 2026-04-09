import type { APIRoute } from 'astro';
import { createServerClient } from '../../lib/supabase';

export const POST: APIRoute = async ({ request }) => {
  const { entradaId } = await request.json();
  const db = createServerClient();

  const { error } = await db
    .from('entradas')
    .update({ estado: 'pagado' })
    .eq('id', entradaId)
    .eq('estado', 'pendiente'); // solo si está pendiente

  if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  return new Response(JSON.stringify({ ok: true }), { status: 200 });
};
