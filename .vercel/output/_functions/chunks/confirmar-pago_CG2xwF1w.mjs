import { createServerClient } from './supabase_CuZ_5uQz.mjs';
import { Resend } from 'resend';
import 'qrcode';

new Resend("re_your_resend_key_here");

const POST = async ({ request }) => {
  const { entradaId } = await request.json();
  const db = createServerClient();
  const { data: entrada, error } = await db.from("entradas").update({ estado: "pagado" }).eq("id", entradaId).eq("estado", "pendiente").select("*, evento:eventos(titulo,fecha,lugar)").single();
  if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  return new Response(JSON.stringify({ ok: true }), { status: 200 });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
