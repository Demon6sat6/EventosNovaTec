import { createServerClient } from './supabase_CuZ_5uQz.mjs';

const GET = async ({ url }) => {
  const eventoId = url.searchParams.get("evento");
  if (!eventoId) return new Response("Falta evento", { status: 400 });
  const db = createServerClient();
  const { data: entradas } = await db.from("entradas").select("*, evento:eventos(titulo)").eq("evento_id", eventoId).order("created_at", { ascending: false });
  if (!entradas?.length) return new Response("Sin datos", { status: 404 });
  const eventoTitulo = entradas[0].evento?.titulo ?? "evento";
  const headers = ["Nombre", "Email", "Cantidad", "Total (S/)", "Estado", "Fecha registro"];
  const rows = entradas.map((e) => [
    e.nombre,
    e.email,
    e.cantidad,
    e.total?.toFixed(2),
    e.estado,
    new Date(e.created_at).toLocaleString("es-ES")
  ]);
  const csv = [headers, ...rows].map((row) => row.map((cell) => `"${String(cell ?? "").replace(/"/g, '""')}"`).join(",")).join("\n");
  const filename = `participantes-${eventoTitulo.toLowerCase().replace(/\s+/g, "-")}.csv`;
  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv;charset=utf-8",
      "Content-Disposition": `attachment; filename="${filename}"`
    }
  });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
