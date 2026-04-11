import { c as createComponent } from './astro-component_CnPl_Uqv.mjs';
import 'piccolore';
import { T as renderTemplate, B as maybeRenderHead, a4 as addAttribute } from './sequence_jkwZ4rKh.mjs';
import { r as renderComponent } from './entrypoint_B7Ywt9HA.mjs';
import { $ as $$Layout } from './Layout_DKJg6wAj.mjs';
import { createServerClient } from './supabase_CuZ_5uQz.mjs';

const $$MisEntradas = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$MisEntradas;
  const email = Astro2.url.searchParams.get("email") ?? "";
  let entradas = [];
  if (email) {
    const db = createServerClient();
    const { data } = await db.from("entradas").select("*, evento:eventos(titulo,fecha,lugar,imagen_url)").eq("email", email.toLowerCase().trim()).order("created_at", { ascending: false });
    entradas = data ?? [];
  }
  const estadoConfig = {
    pagado: { color: "#a78bfa", label: "Confirmado" },
    asistio: { color: "#4ade80", label: "Asistió" },
    pendiente: { color: "#fbbf24", label: "Pendiente" },
    cancelado: { color: "#f87171", label: "Cancelado" }
  };
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Mis Entradas" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<section style="background:#02020a;min-height:100vh;padding:80px 24px;"> <div style="max-width:680px;margin:0 auto;"> <div style="text-align:center;margin-bottom:48px;"> <div style="display:inline-flex;align-items:center;gap:8px;background:rgba(124,58,237,0.08);border:1px solid rgba(124,58,237,0.2);padding:6px 16px;border-radius:100px;margin-bottom:16px;"> <span style="width:5px;height:5px;background:#a78bfa;border-radius:50%;"></span> <span style="color:#a78bfa;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:2px;">Mis entradas</span> </div> <h1 style="font-size:clamp(28px,5vw,48px);font-weight:900;color:white;letter-spacing:-2px;margin-bottom:8px;">Encuentra tus entradas</h1> <p style="color:rgba(255,255,255,0.35);font-size:15px;">Ingresa el email con el que compraste</p> </div> <!-- Buscador --> <form method="GET" class="mis-entradas-form" style="margin-bottom:48px;"> <div style="flex:1;position:relative;"> <svg style="position:absolute;left:14px;top:50%;transform:translateY(-50%);opacity:0.3;" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"> <rect x="2" y="4" width="20" height="16" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path> </svg> <input type="email" name="email"${addAttribute(email, "value")} required placeholder="tu@email.com" style="width:100%;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.1);color:white;border-radius:12px;padding:13px 16px 13px 42px;font-size:14px;outline:none;font-family:inherit;box-sizing:border-box;transition:border-color 0.2s;" onfocus="this.style.borderColor='rgba(124,58,237,0.6)'" onblur="this.style.borderColor='rgba(255,255,255,0.1)'"> </div> <button type="submit" style="background:linear-gradient(135deg,#7c3aed,#ec4899);color:white;font-weight:700;font-size:14px;padding:13px 24px;border-radius:12px;border:none;cursor:pointer;font-family:inherit;white-space:nowrap;box-shadow:0 4px 20px rgba(124,58,237,0.3);">
Buscar
</button> </form> <!-- Resultados --> ${email && renderTemplate`<div> ${entradas.length > 0 ? renderTemplate`<div style="display:flex;flex-direction:column;gap:16px;"> ${entradas.map((e) => {
    const cfg = estadoConfig[e.estado] ?? estadoConfig.pendiente;
    return renderTemplate`<a${addAttribute(`/entrada/${e.id}`, "href")} style="display:block;background:linear-gradient(145deg,#0a0a18,#080812);border:1px solid rgba(255,255,255,0.06);border-radius:20px;overflow:hidden;text-decoration:none;transition:all 0.3s;" onmouseover="this.style.borderColor='rgba(124,58,237,0.3)';this.style.transform='translateY(-2px)'" onmouseout="this.style.borderColor='rgba(255,255,255,0.06)';this.style.transform='translateY(0)'"> <div class="entrada-img-row"> ${e.evento?.imagen_url && renderTemplate`<img${addAttribute(e.evento.imagen_url, "src")}${addAttribute(e.evento?.titulo, "alt")} style="width:100px;height:100px;object-fit:cover;flex-shrink:0;filter:brightness(0.7);">`} <div style="flex:1;padding:16px 20px;display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap;"> <div> <p style="color:white;font-weight:700;font-size:15px;margin-bottom:4px;">${e.evento?.titulo}</p> <p style="color:rgba(255,255,255,0.3);font-size:12px;margin-bottom:4px;"> ${new Date(e.evento?.fecha).toLocaleDateString("es-ES", { dateStyle: "medium" })} · ${e.evento?.lugar} </p> <p style="color:rgba(255,255,255,0.2);font-size:11px;">${e.cantidad} entrada${e.cantidad > 1 ? "s" : ""}</p> </div> <div style="text-align:right;flex-shrink:0;"> <span${addAttribute(`display:inline-block;padding:4px 12px;border-radius:100px;font-size:11px;font-weight:700;color:${cfg.color};background:${cfg.color}18;border:1px solid ${cfg.color}30;margin-bottom:6px;`, "style")}> ${cfg.label} </span> <p style="color:#a78bfa;font-size:12px;font-weight:600;">Ver entrada →</p> </div> </div> </div> </a>`;
  })} </div>` : renderTemplate`<div style="text-align:center;padding:60px 0;"> <div style="width:60px;height:60px;border:1px solid rgba(255,255,255,0.1);border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 16px;"> <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.2)" stroke-width="1.5"> <circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.35-4.35"></path> </svg> </div> <p style="color:rgba(255,255,255,0.3);font-size:15px;font-weight:600;">No se encontraron entradas</p> <p style="color:rgba(255,255,255,0.15);font-size:13px;margin-top:6px;">para <strong style="color:rgba(255,255,255,0.3);">${email}</strong></p> </div>`} </div>`} </div> </section> ` })}`;
}, "C:/Users/Sat/OneDrive - SENATI/Desktop/Web de eventos + sistema de entradas y asistencia/eventos-app/src/pages/mis-entradas.astro", void 0);

const $$file = "C:/Users/Sat/OneDrive - SENATI/Desktop/Web de eventos + sistema de entradas y asistencia/eventos-app/src/pages/mis-entradas.astro";
const $$url = "/mis-entradas";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$MisEntradas,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
