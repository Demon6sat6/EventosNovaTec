import { c as createComponent } from './astro-component_CnPl_Uqv.mjs';
import 'piccolore';
import { T as renderTemplate, B as maybeRenderHead, a4 as addAttribute } from './sequence_jkwZ4rKh.mjs';
import { r as renderComponent } from './entrypoint_BA6aodfA.mjs';
import { $ as $$AdminLayout } from './AdminLayout_Bkp6hMb9.mjs';
import { createServerClient } from './supabase_CuZ_5uQz.mjs';

const $$Eventos = createComponent(async ($$result, $$props, $$slots) => {
  const db = createServerClient();
  const { data: eventos } = await db.from("eventos").select("*").order("fecha", { ascending: false });
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "Gestión de Eventos" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div style="display:flex;justify-content:flex-end;margin-bottom:20px;"> <a href="/admin/eventos/nuevo" style="display:inline-flex;align-items:center;gap:8px;background:linear-gradient(135deg,#7c3aed,#ec4899);color:white;font-weight:600;font-size:13px;padding:10px 20px;border-radius:10px;text-decoration:none;box-shadow:0 4px 16px rgba(124,58,237,0.3);transition:transform 0.2s;" onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform='translateY(0)'">
➕ Nuevo Evento
</a> </div> <div style="background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.06);border-radius:16px;overflow:hidden;"> <!-- Header tabla --> <div style="display:grid;grid-template-columns:1fr 120px 100px 90px 100px 140px;gap:0;padding:10px 20px;border-bottom:1px solid rgba(255,255,255,0.06);background:rgba(255,255,255,0.02);"> ${["Evento", "Fecha", "Precio", "Capacidad", "Estado", "Acciones"].map((h) => renderTemplate`<span style="color:rgba(255,255,255,0.25);font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:1px;">${h}</span>`)} </div> ${eventos && eventos.length > 0 ? renderTemplate`<div> ${eventos.map((ev, i) => renderTemplate`<div${addAttribute(`display:grid;grid-template-columns:1fr 120px 100px 90px 100px 140px;gap:0;padding:14px 20px;align-items:center;${i < eventos.length - 1 ? "border-bottom:1px solid rgba(255,255,255,0.04);" : ""}transition:background 0.15s;`, "style")} onmouseover="this.style.background='rgba(255,255,255,0.02)'" onmouseout="this.style.background='transparent'"> <div> <p style="color:white;font-size:13px;font-weight:600;">${ev.titulo}</p> <p style="color:rgba(255,255,255,0.25);font-size:11px;margin-top:2px;">/${ev.slug}</p> </div> <span style="color:rgba(255,255,255,0.5);font-size:12px;">${new Date(ev.fecha).toLocaleDateString("es-ES")}</span> <span style="color:rgba(255,255,255,0.5);font-size:12px;">${ev.precio === 0 ? "Gratis" : `S/ ${ev.precio}`}</span> <span style="color:rgba(255,255,255,0.5);font-size:12px;">${ev.capacidad}</span> <span${addAttribute(`display:inline-block;padding:3px 10px;border-radius:100px;font-size:11px;font-weight:600;${ev.publicado ? "background:rgba(34,197,94,0.12);color:#4ade80;border:1px solid rgba(34,197,94,0.25);" : "background:rgba(255,255,255,0.05);color:rgba(255,255,255,0.3);border:1px solid rgba(255,255,255,0.1);"}`, "style")}> ${ev.publicado ? "● Publicado" : "○ Borrador"} </span> <div style="display:flex;gap:8px;"> <a${addAttribute(`/admin/eventos/${ev.id}`, "href")} style="color:#a78bfa;font-size:12px;font-weight:600;text-decoration:none;padding:4px 10px;background:rgba(124,58,237,0.1);border:1px solid rgba(124,58,237,0.2);border-radius:6px;transition:all 0.15s;" onmouseover="this.style.background='rgba(124,58,237,0.2)'" onmouseout="this.style.background='rgba(124,58,237,0.1)'">Editar</a> <a${addAttribute(`/admin/participantes?evento=${ev.id}`, "href")} style="color:rgba(255,255,255,0.4);font-size:12px;font-weight:500;text-decoration:none;padding:4px 10px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:6px;transition:all 0.15s;" onmouseover="this.style.color='white'" onmouseout="this.style.color='rgba(255,255,255,0.4)'">Lista</a> </div> </div>`)} </div>` : renderTemplate`<div style="text-align:center;padding:60px 24px;"> <p style="font-size:40px;margin-bottom:12px;opacity:0.3;">📅</p> <p style="color:rgba(255,255,255,0.2);font-size:14px;">No hay eventos creados</p> <a href="/admin/eventos/nuevo" style="display:inline-block;margin-top:16px;color:#a78bfa;font-size:13px;text-decoration:none;">Crear el primero →</a> </div>`} </div> ` })}`;
}, "C:/Users/Sat/OneDrive - SENATI/Desktop/Web de eventos + sistema de entradas y asistencia/eventos-app/src/pages/admin/eventos.astro", void 0);

const $$file = "C:/Users/Sat/OneDrive - SENATI/Desktop/Web de eventos + sistema de entradas y asistencia/eventos-app/src/pages/admin/eventos.astro";
const $$url = "/admin/eventos";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Eventos,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
