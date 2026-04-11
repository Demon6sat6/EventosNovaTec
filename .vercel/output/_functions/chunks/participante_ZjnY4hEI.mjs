import { createServerClient } from './supabase_CuZ_5uQz.mjs';

const POST = async ({ request }) => {
  const body = await request.json();
  const { action, id, ...fields } = body;
  const db = createServerClient();
  if (action === "eliminar") {
    const { error } = await db.from("entradas").delete().eq("id", id);
    if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  }
  if (action === "editar") {
    const { error } = await db.from("entradas").update({
      nombre: fields.nombre,
      email: fields.email,
      cantidad: Number(fields.cantidad),
      estado: fields.estado
    }).eq("id", id);
    if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  }
  if (action === "confirmar") {
    const { error } = await db.from("entradas").update({ estado: "pagado" }).eq("id", id).eq("estado", "pendiente");
    if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  }
  return new Response(JSON.stringify({ error: "Acción no válida" }), { status: 400 });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
