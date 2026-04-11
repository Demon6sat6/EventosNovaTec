import { createServerClient } from './supabase_CuZ_5uQz.mjs';
import './stripe_CmXxU-t9.mjs';
import { randomUUID } from 'crypto';

const POST = async ({ request }) => {
  const { eventoId, nombre, email, cantidad } = await request.json();
  const db = createServerClient();
  const { data: evento } = await db.from("eventos").select("*").eq("id", eventoId).single();
  if (!evento) return new Response(JSON.stringify({ error: "Evento no encontrado" }), { status: 404 });
  const { count } = await db.from("entradas").select("*", { count: "exact", head: true }).eq("evento_id", eventoId).in("estado", ["pagado", "asistio"]);
  if ((count ?? 0) + cantidad > evento.capacidad) {
    return new Response(JSON.stringify({ error: "No hay suficientes lugares disponibles" }), { status: 400 });
  }
  const codigoQr = randomUUID();
  const { data: entrada, error } = await db.from("entradas").insert({
    evento_id: eventoId,
    nombre,
    email,
    cantidad,
    total: evento.precio * cantidad,
    codigo_qr: codigoQr,
    estado: "pendiente"
  }).select().single();
  if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  return new Response(JSON.stringify({ entradaId: entrada.id }), { status: 200 });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
