import { c as createComponent } from './astro-component_CnPl_Uqv.mjs';
import 'piccolore';
import { T as renderTemplate, B as maybeRenderHead, a4 as addAttribute } from './sequence_jkwZ4rKh.mjs';
import { r as renderComponent } from './entrypoint_D5PyMbLA.mjs';
import { $ as $$AdminLayout } from './AdminLayout_Cf2CqdKK.mjs';

const $$Configuracion = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Configuracion;
  const env = "production";
  const services = [
    { label: "Supabase URL", ok: true, icon: "🗄️", desc: "Base de datos PostgreSQL" },
    { label: "Supabase Anon Key", ok: true, icon: "🔑", desc: "Clave pública de acceso" },
    { label: "Stripe Secret Key", ok: true, icon: "💳", desc: "Procesamiento de pagos" },
    { label: "Site URL", ok: true, icon: "🌐", desc: "URL del sitio público" }
  ];
  const allOk = services.every((s) => s.ok);
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "Configuración", "data-astro-cid-6kdlctd2": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="config-grid" data-astro-cid-6kdlctd2> <!-- Banner de estado general --> <div${addAttribute(`status-banner ${allOk ? "ok" : "warn"}`, "class")} data-astro-cid-6kdlctd2> <div class="status-icon" data-astro-cid-6kdlctd2>${allOk ? "✅" : "⚠️"}</div> <div data-astro-cid-6kdlctd2> <p class="status-title" data-astro-cid-6kdlctd2>${allOk ? "Todo configurado correctamente" : "Faltan variables de entorno"}</p> <p class="status-sub" data-astro-cid-6kdlctd2>${allOk ? "Todos los servicios están activos y listos." : "Revisá las variables marcadas abajo."}</p> </div> <span${addAttribute(`status-badge ${allOk ? "badge-green" : "badge-yellow"}`, "class")} data-astro-cid-6kdlctd2>${env}</span> </div> <div class="two-col" data-astro-cid-6kdlctd2> <!-- Info del sistema --> <div class="card" data-astro-cid-6kdlctd2> <div class="card-header" data-astro-cid-6kdlctd2> <div class="card-icon" style="background:linear-gradient(135deg,#7c3aed22,#7c3aed11);border-color:#7c3aed33;" data-astro-cid-6kdlctd2> <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-6kdlctd2> <rect x="2" y="3" width="20" height="14" rx="2" data-astro-cid-6kdlctd2></rect><path d="M8 21h8M12 17v4" data-astro-cid-6kdlctd2></path> </svg> </div> <div data-astro-cid-6kdlctd2> <h3 class="card-title" data-astro-cid-6kdlctd2>Sistema</h3> <p class="card-sub" data-astro-cid-6kdlctd2>Información del stack</p> </div> </div> <div class="info-list" data-astro-cid-6kdlctd2> ${[
    { label: "Versión", value: "1.0.0", color: "#a78bfa" },
    { label: "Framework", value: "Astro + React", color: "#60a5fa" },
    { label: "Base de datos", value: "Supabase (PostgreSQL)", color: "#34d399" },
    { label: "Pagos", value: "Stripe", color: "#f472b6" },
    { label: "Entorno", value: env, color: "#4ade80"  }
  ].map((item) => renderTemplate`<div class="info-row" data-astro-cid-6kdlctd2> <span class="info-label" data-astro-cid-6kdlctd2>${item.label}</span> <span class="info-value"${addAttribute(`color:${item.color};background:${item.color}15;border-color:${item.color}25`, "style")} data-astro-cid-6kdlctd2>${item.value}</span> </div>`)} </div> </div> <!-- Estado de servicios --> <div class="card" data-astro-cid-6kdlctd2> <div class="card-header" data-astro-cid-6kdlctd2> <div class="card-icon" style="background:linear-gradient(135deg,#10b98122,#10b98111);border-color:#10b98133;" data-astro-cid-6kdlctd2> <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#34d399" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-6kdlctd2> <path d="M22 12h-4l-3 9L9 3l-3 9H2" data-astro-cid-6kdlctd2></path> </svg> </div> <div data-astro-cid-6kdlctd2> <h3 class="card-title" data-astro-cid-6kdlctd2>Servicios</h3> <p class="card-sub" data-astro-cid-6kdlctd2>Variables de entorno</p> </div> </div> <div class="info-list" data-astro-cid-6kdlctd2> ${services.map((s) => renderTemplate`<div class="info-row" data-astro-cid-6kdlctd2> <div style="display:flex;align-items:center;gap:8px;" data-astro-cid-6kdlctd2> <span style="font-size:14px;" data-astro-cid-6kdlctd2>${s.icon}</span> <div data-astro-cid-6kdlctd2> <p class="info-label" style="color:rgba(255,255,255,0.7);font-size:13px;" data-astro-cid-6kdlctd2>${s.label}</p> <p style="color:rgba(255,255,255,0.25);font-size:11px;" data-astro-cid-6kdlctd2>${s.desc}</p> </div> </div> <span${addAttribute(`service-badge ${s.ok ? "badge-ok" : "badge-fail"}`, "class")} data-astro-cid-6kdlctd2> ${s.ok ? "✓ OK" : "✗ Falta"} </span> </div>`)} </div> </div> </div> <!-- Links rápidos --> <div class="card" data-astro-cid-6kdlctd2> <div class="card-header" data-astro-cid-6kdlctd2> <div class="card-icon" style="background:linear-gradient(135deg,#f472b622,#f472b611);border-color:#f472b633;" data-astro-cid-6kdlctd2> <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f472b6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-6kdlctd2> <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" data-astro-cid-6kdlctd2></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" data-astro-cid-6kdlctd2></path> </svg> </div> <div data-astro-cid-6kdlctd2> <h3 class="card-title" data-astro-cid-6kdlctd2>Links rápidos</h3> <p class="card-sub" data-astro-cid-6kdlctd2>Accesos directos a herramientas</p> </div> </div> <div class="links-grid" data-astro-cid-6kdlctd2> ${[
    { label: "Supabase Dashboard", url: "https://supabase.com/dashboard", icon: "🗄️", desc: "Base de datos y auth", color: "#3ecf8e" },
    { label: "Stripe Dashboard", url: "https://dashboard.stripe.com", icon: "💳", desc: "Pagos y transacciones", color: "#635bff" },
    { label: "Ver sitio público", url: "/", icon: "🌐", desc: "Frontend de la app", color: "#60a5fa" },
    { label: "Docs Astro", url: "https://docs.astro.build", icon: "📚", desc: "Documentación oficial", color: "#f97316" }
  ].map((item) => renderTemplate`<a${addAttribute(item.url, "href")} target="_blank" rel="noopener" class="link-card"${addAttribute(`--accent:${item.color}`, "style")} data-astro-cid-6kdlctd2> <div class="link-icon"${addAttribute(`background:${item.color}15;border-color:${item.color}25`, "style")} data-astro-cid-6kdlctd2>${item.icon}</div> <div class="link-info" data-astro-cid-6kdlctd2> <p class="link-label" data-astro-cid-6kdlctd2>${item.label}</p> <p class="link-desc" data-astro-cid-6kdlctd2>${item.desc}</p> </div> <svg class="link-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-6kdlctd2> <path d="M7 17L17 7M7 7h10v10" data-astro-cid-6kdlctd2></path> </svg> </a>`)} </div> </div> </div> ` })}`;
}, "C:/Users/Sat/OneDrive - SENATI/Desktop/Web de eventos + sistema de entradas y asistencia/eventos-app/src/pages/admin/configuracion.astro", void 0);
const $$file = "C:/Users/Sat/OneDrive - SENATI/Desktop/Web de eventos + sistema de entradas y asistencia/eventos-app/src/pages/admin/configuracion.astro";
const $$url = "/admin/configuracion";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Configuracion,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
