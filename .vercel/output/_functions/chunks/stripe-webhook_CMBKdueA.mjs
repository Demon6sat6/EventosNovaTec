import { s as stripe } from './stripe_CmXxU-t9.mjs';
import { createServerClient } from './supabase_CuZ_5uQz.mjs';

const POST = async ({ request }) => {
  const body = await request.text();
  const sig = request.headers.get("stripe-signature") ?? "";
  let event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, undefined                                     );
  } catch {
    return new Response("Webhook signature invalid", { status: 400 });
  }
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const entradaId = session.metadata?.entradaId;
    if (entradaId) {
      const db = createServerClient();
      await db.from("entradas").update({ estado: "pagado" }).eq("id", entradaId);
    }
  }
  return new Response("ok", { status: 200 });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
