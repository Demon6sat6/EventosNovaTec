import type { APIRoute } from 'astro';
import { createServerClient } from '../../lib/supabase';

export const POST: APIRoute = async ({ request }) => {
  const { codigo } = await request.json();
  const db = createServerClient();

  const { data: entrada } = await db
    .from('entradas')
    .select('*, evento:eventos(titulo, fecha)')
    .eq('codigo_qr', codigo)
    .single();

  if (!entrada) {
    return new Response(JSON.stringify({ ok: false, error: 'Código no encontrado' }), { status: 404 });
  }

  if (entrada.estado === 'asistio') {
    return new Response(JSON.stringify({ ok: false, error: 'Esta entrada ya fue usada', entrada }), { status: 200 });
  }

  if (entrada.estado !== 'pagado') {
    return new Response(JSON.stringify({ ok: false, error: `Estado inválido: ${entrada.estado}`, entrada }), { status: 200 });
  }

  await db.from('entradas').update({ estado: 'asistio' }).eq('id', entrada.id);

  return new Response(JSON.stringify({ ok: true, entrada: { ...entrada, estado: 'asistio' } }), { status: 200 });
};
