import type { APIRoute } from 'astro';
import { createServerClient } from '../../lib/supabase';
import { enviarEmailEntrada } from '../../lib/email';

export const POST: APIRoute = async ({ request }) => {
  const { entradaId } = await request.json();
  const db = createServerClient();

  const { data: entrada, error } = await db
    .from('entradas')
    .update({ estado: 'pagado' })
    .eq('id', entradaId)
    .eq('estado', 'pendiente')
    .select('*, evento:eventos(titulo,fecha,lugar)')
    .single();

  if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });

  // Enviar email con QR si Resend está configurado
  if (import.meta.env.RESEND_API_KEY && import.meta.env.RESEND_API_KEY !== 're_your_resend_key_here') {
    try {
      await enviarEmailEntrada({
        id:        entrada.id,
        nombre:    entrada.nombre,
        email:     entrada.email,
        cantidad:  entrada.cantidad,
        total:     entrada.total,
        codigo_qr: entrada.codigo_qr,
        evento:    entrada.evento as any,
      });
    } catch (e) {
      console.error('Error enviando email:', e);
    }
  }

  return new Response(JSON.stringify({ ok: true }), { status: 200 });
};
