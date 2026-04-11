import { c as createComponent } from './astro-component_CnPl_Uqv.mjs';
import 'piccolore';
import { T as renderTemplate, B as maybeRenderHead } from './sequence_jkwZ4rKh.mjs';
import { r as renderComponent } from './entrypoint_D5PyMbLA.mjs';
import { $ as $$AdminLayout } from './AdminLayout_Cf2CqdKK.mjs';
import { g as getSessionUser } from './auth_Zqlk1v2P.mjs';

const $$Perfil = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Perfil;
  const user = getSessionUser(Astro2.cookies);
  const adminEmail = user?.email ?? "admin@eventosapp.com";
  const adminNombre = user?.nombre ?? adminEmail;
  const adminRol = user?.rol ?? "admin";
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "Mi Perfil" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div style="max-width:640px;display:flex;flex-direction:column;gap:20px;"> <!-- Info cuenta --> <div style="background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.07);border-radius:20px;overflow:hidden;"> <div style="padding:20px 24px;border-bottom:1px solid rgba(255,255,255,0.06);background:rgba(124,58,237,0.05);"> <p style="color:#a78bfa;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;">Información de cuenta</p> </div> <div style="padding:24px;display:flex;align-items:center;gap:16px;"> <div style="width:56px;height:56px;background:linear-gradient(135deg,#7c3aed,#ec4899);border-radius:16px;display:flex;align-items:center;justify-content:center;font-size:22px;font-weight:900;color:white;flex-shrink:0;box-shadow:0 8px 20px rgba(124,58,237,0.4);"> ${adminNombre.charAt(0).toUpperCase()} </div> <div> <p style="color:white;font-weight:700;font-size:16px;">${adminNombre}</p> <p style="color:rgba(255,255,255,0.3);font-size:13px;margin-top:2px;">${adminEmail}</p> <span style="display:inline-flex;align-items:center;gap:6px;background:rgba(124,58,237,0.1);border:1px solid rgba(124,58,237,0.2);color:#a78bfa;font-size:11px;font-weight:600;padding:3px 10px;border-radius:100px;margin-top:6px;"> ${adminRol} </span> </div> </div> </div> <!-- Cambiar credenciales --> <div style="background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.07);border-radius:20px;overflow:hidden;"> <div style="padding:20px 24px;border-bottom:1px solid rgba(255,255,255,0.06);background:rgba(124,58,237,0.05);"> <p style="color:#a78bfa;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;">Cambiar credenciales</p> </div> <div style="padding:24px;"> <p style="color:rgba(255,255,255,0.4);font-size:13px;margin-bottom:16px;">
Las credenciales se gestionan desde el archivo <code style="background:rgba(255,255,255,0.06);color:#a78bfa;padding:2px 8px;border-radius:6px;font-size:12px;">.env</code> del proyecto.
</p> <div style="background:#02020a;border:1px solid rgba(255,255,255,0.06);border-radius:12px;padding:16px;font-family:monospace;font-size:13px;line-height:2;"> <p style="color:rgba(255,255,255,0.2);font-size:11px;margin-bottom:4px;"># .env</p> <p><span style="color:#a78bfa;">ADMIN_EMAIL</span><span style="color:rgba(255,255,255,0.3);">=</span><span style="color:#4ade80;">${adminEmail}</span></p> <p><span style="color:#a78bfa;">ADMIN_PASSWORD</span><span style="color:rgba(255,255,255,0.3);">=</span><span style="color:rgba(255,255,255,0.2);">••••••••</span></p> </div> <p style="color:rgba(255,255,255,0.2);font-size:11px;margin-top:10px;">Edita el .env y reinicia el servidor para aplicar los cambios.</p> </div> </div> <!-- Cerrar sesión --> <div style="background:rgba(239,68,68,0.04);border:1px solid rgba(239,68,68,0.1);border-radius:20px;padding:24px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;"> <div> <p style="color:white;font-weight:600;font-size:14px;margin-bottom:4px;">Cerrar sesión</p> <p style="color:rgba(255,255,255,0.3);font-size:12px;">Tu sesión expira automáticamente en 8 horas.</p> </div> <form method="POST" action="/api/auth/logout"> <button type="submit" style="background:rgba(239,68,68,0.1);border:1px solid rgba(239,68,68,0.2);color:#f87171;font-weight:600;font-size:13px;padding:10px 20px;border-radius:10px;cursor:pointer;font-family:inherit;transition:all 0.2s;" onmouseover="this.style.background='rgba(239,68,68,0.2)'" onmouseout="this.style.background='rgba(239,68,68,0.1)'">
⏻ Cerrar sesión
</button> </form> </div> </div> ` })}`;
}, "C:/Users/Sat/OneDrive - SENATI/Desktop/Web de eventos + sistema de entradas y asistencia/eventos-app/src/pages/admin/perfil.astro", void 0);

const $$file = "C:/Users/Sat/OneDrive - SENATI/Desktop/Web de eventos + sistema de entradas y asistencia/eventos-app/src/pages/admin/perfil.astro";
const $$url = "/admin/perfil";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Perfil,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
