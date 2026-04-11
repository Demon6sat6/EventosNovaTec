import { c as createComponent } from './astro-component_CnPl_Uqv.mjs';
import 'piccolore';
import { T as renderTemplate, B as maybeRenderHead, a4 as addAttribute } from './sequence_jkwZ4rKh.mjs';
import { r as renderComponent } from './entrypoint_B7Ywt9HA.mjs';
import { $ as $$AdminLayout } from './AdminLayout_Dkk_-xhQ.mjs';
import { createServerClient } from './supabase_CuZ_5uQz.mjs';

const $$Reportes = createComponent(async ($$result, $$props, $$slots) => {
  const db = createServerClient();
  const { data: ventasPorEvento } = await db.from("entradas").select("evento_id, total, cantidad, estado, evento:eventos(titulo)").in("estado", ["pagado", "asistio"]);
  const resumen = {};
  for (const e of ventasPorEvento ?? []) {
    const id = e.evento_id;
    const titulo = e.evento?.titulo ?? "Sin nombre";
    if (!resumen[id]) resumen[id] = { titulo, entradas: 0, asistentes: 0, ingresos: 0 };
    resumen[id].entradas += e.cantidad ?? 0;
    resumen[id].ingresos += e.total ?? 0;
    if (e.estado === "asistio") resumen[id].asistentes += e.cantidad ?? 0;
  }
  const filas = Object.values(resumen);
  const totalIngresos = filas.reduce((s, f) => s + f.ingresos, 0);
  const totalEntradas = filas.reduce((s, f) => s + f.entradas, 0);
  const totalAsistentes = filas.reduce((s, f) => s + f.asistentes, 0);
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "Reportes de Ventas" }, { "default": async ($$result2) => renderTemplate`  ${maybeRenderHead()}<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:16px;margin-bottom:28px;"> ${[
    { label: "Ingresos totales", value: `S/ ${totalIngresos.toFixed(2)}`, icon: "💰", color: "#22c55e", bg: "rgba(34,197,94,0.1)", border: "rgba(34,197,94,0.2)" },
    { label: "Entradas vendidas", value: totalEntradas, icon: "🎟", color: "#a78bfa", bg: "rgba(124,58,237,0.1)", border: "rgba(124,58,237,0.2)" },
    { label: "Asistentes confirmados", value: totalAsistentes, icon: "👥", color: "#4ade80", bg: "rgba(34,197,94,0.08)", border: "rgba(34,197,94,0.15)" }
  ].map((s) => renderTemplate`<div${addAttribute(`background:${s.bg};border:1px solid ${s.border};border-radius:16px;padding:20px 22px;`, "style")}> <p style="color:rgba(255,255,255,0.3);font-size:11px;margin-bottom:8px;">${s.icon} ${s.label}</p> <p${addAttribute(`font-size:30px;font-weight:900;color:${s.color};`, "style")}>${s.value}</p> </div>`)} </div>  <div style="background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.06);border-radius:16px;overflow:hidden;"> <div style="padding:14px 20px;border-bottom:1px solid rgba(255,255,255,0.06);"> <p style="color:white;font-weight:600;font-size:14px;">Ventas por evento</p> </div> <div style="display:grid;grid-template-columns:1fr 100px 100px 80px 120px;padding:10px 20px;border-bottom:1px solid rgba(255,255,255,0.04);background:rgba(255,255,255,0.01);"> ${["Evento", "Entradas", "Asistentes", "Tasa", "Ingresos"].map((h) => renderTemplate`<span style="color:rgba(255,255,255,0.2);font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:1px;">${h}</span>`)} </div> ${filas.length > 0 ? renderTemplate`<div> ${filas.map((f, i) => {
    const tasa = f.entradas > 0 ? Math.round(f.asistentes / f.entradas * 100) : 0;
    const tasaColor = tasa >= 80 ? "#4ade80" : tasa >= 50 ? "#fbbf24" : "rgba(255,255,255,0.3)";
    return renderTemplate`<div${addAttribute(`display:grid;grid-template-columns:1fr 100px 100px 80px 120px;padding:14px 20px;align-items:center;${i < filas.length - 1 ? "border-bottom:1px solid rgba(255,255,255,0.03);" : ""}transition:background 0.15s;`, "style")} onmouseover="this.style.background='rgba(255,255,255,0.02)'" onmouseout="this.style.background='transparent'"> <span style="color:white;font-size:13px;font-weight:500;">${f.titulo}</span> <span style="color:rgba(255,255,255,0.5);font-size:13px;">${f.entradas}</span> <span style="color:rgba(255,255,255,0.5);font-size:13px;">${f.asistentes}</span> <span${addAttribute(`font-size:13px;font-weight:700;color:${tasaColor};`, "style")}>${tasa}%</span> <span style="color:#4ade80;font-size:13px;font-weight:700;">S/ ${f.ingresos.toFixed(2)}</span> </div>`;
  })} </div>` : renderTemplate`<div style="text-align:center;padding:48px;"> <p style="font-size:36px;margin-bottom:8px;opacity:0.3;">📊</p> <p style="color:rgba(255,255,255,0.2);font-size:13px;">No hay ventas registradas</p> </div>`} </div> ` })}`;
}, "C:/Users/Sat/OneDrive - SENATI/Desktop/Web de eventos + sistema de entradas y asistencia/eventos-app/src/pages/admin/reportes.astro", void 0);

const $$file = "C:/Users/Sat/OneDrive - SENATI/Desktop/Web de eventos + sistema de entradas y asistencia/eventos-app/src/pages/admin/reportes.astro";
const $$url = "/admin/reportes";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Reportes,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
