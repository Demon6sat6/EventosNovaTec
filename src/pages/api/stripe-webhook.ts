import type { APIRoute } from 'astro';
import { stripe } from '../../lib/stripe';
import { createServerClient } from '../../lib/supabase';

export const POST: APIRoute = async ({ request }) => {
  const body = await request.text();
  const sig = request.headers.get('stripe-signature') ?? '';

  let event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, import.meta.env.STRIPE_WEBHOOK_SECRET);
  } catch {
    return new Response('Webhook signature invalid', { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as any;
    const entradaId = session.metadata?.entradaId;

    if (entradaId) {
      const db = createServerClient();
      await db.from('entradas').update({ estado: 'pagado' }).eq('id', entradaId);
    }
  }

  return new Response('ok', { status: 200 });
};
