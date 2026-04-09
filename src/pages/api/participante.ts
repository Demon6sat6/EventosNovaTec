import type { APIRoute } from 'astro';
import { createServerClient } from '../../lib/supabase';

export const POST: APIRoute = async ({ request }) => {
  const body = await request.json();
  const { action, id, ...fields } = body;
  const db = createServerClient();

  if (action === 'eliminar') {
    const { error } = await db.from('entradas').delete().eq('id', id);
    if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  }

  if (action === 'editar') {
    const { error } = await db.from('entradas').update({
      nombre:   fields.nombre,
      email:    fields.email,
      cantidad: Number(fields.cantidad),
      estado:   fields.estado,
    }).eq('id', id);
    if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  }

  if (action === 'confirmar') {
    const { error } = await db.from('entradas').update({ estado: 'pagado' }).eq('id', id).eq('estado', 'pendiente');
    if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  }

  return new Response(JSON.stringify({ error: 'Acción no válida' }), { status: 400 });
};
