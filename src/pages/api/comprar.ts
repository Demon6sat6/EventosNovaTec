import type { APIRoute } from 'astro';
import { createServerClient } from '../../lib/supabase';
import { stripe } from '../../lib/stripe';
import { randomUUID } from 'crypto';

export const POST: APIRoute = async ({ request }) => {
  const { eventoId, nombre, email, cantidad } = await request.json();

  const db = createServerClient();

  // Verificar evento y disponibilidad
  const { data: evento } = await db.from('eventos').select('*').eq('id', eventoId).single();
  if (!evento) return new Response(JSON.stringify({ error: 'Evento no encontrado' }), { status: 404 });

  const { count } = await db
    .from('entradas')
    .select('*', { count: 'exact', head: true })
    .eq('evento_id', eventoId)
    .in('estado', ['pagado', 'asistio']);

  if ((count ?? 0) + cantidad > evento.capacidad) {
    return new Response(JSON.stringify({ error: 'No hay suficientes lugares disponibles' }), { status: 400 });
  }

  const codigoQr = randomUUID();

  // Crear entrada en estado pagado directamente (sin Stripe por ahora)
  const { data: entrada, error } = await db
    .from('entradas')
    .insert({
      evento_id: eventoId,
      nombre,
      email,
      cantidad,
      total: evento.precio * cantidad,
      codigo_qr: codigoQr,
      estado: 'pagado',
    })
    .select()
    .single();

  if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });

  // Retornar directo a la entrada (Stripe desactivado hasta configurar keys)
  return new Response(JSON.stringify({ entradaId: entrada.id }), { status: 200 });
};
