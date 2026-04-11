import { c as createComponent } from './astro-component_CnPl_Uqv.mjs';
import 'piccolore';
import { b9 as renderHead, T as renderTemplate } from './sequence_jkwZ4rKh.mjs';
import 'clsx';
import { i as isAuthenticated, a as isValidCredentials, s as setSessionCookie } from './auth_Zqlk1v2P.mjs';

const $$Login = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Login;
  if (isAuthenticated(Astro2.cookies)) return Astro2.redirect("/admin");
  let error = "";
  if (Astro2.request.method === "POST") {
    const form = await Astro2.request.formData();
    const email = form.get("email") ?? "";
    const password = form.get("password") ?? "";
    const user = await isValidCredentials(email, password);
    if (user) {
      setSessionCookie(Astro2.cookies, user);
      return Astro2.redirect("/admin");
    } else {
      error = "Credenciales incorrectas";
    }
  }
  return renderTemplate`<html lang="es" data-astro-cid-rf56lckb> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Admin — Acceso | EventosApp</title><link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">${renderHead()}</head> <body data-astro-cid-rf56lckb> <div style="min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px;position:relative;overflow:hidden;" data-astro-cid-rf56lckb> <!-- Fondo --> <div style="position:absolute;inset:0;background:radial-gradient(ellipse at 50% -20%,rgba(124,58,237,0.2) 0%,transparent 60%),radial-gradient(ellipse at 80% 100%,rgba(236,72,153,0.1) 0%,transparent 50%);" data-astro-cid-rf56lckb></div> <!-- Orbes --> <div class="orb1" style="position:absolute;top:-150px;right:-100px;width:500px;height:500px;background:radial-gradient(circle,rgba(124,58,237,0.1),transparent 70%);border-radius:50%;pointer-events:none;" data-astro-cid-rf56lckb></div> <div class="orb2" style="position:absolute;bottom:-150px;left:-100px;width:400px;height:400px;background:radial-gradient(circle,rgba(236,72,153,0.08),transparent 70%);border-radius:50%;pointer-events:none;" data-astro-cid-rf56lckb></div> <!-- Grid --> <div style="position:absolute;inset:0;background-image:linear-gradient(rgba(124,58,237,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(124,58,237,0.04) 1px,transparent 1px);background-size:50px 50px;pointer-events:none;" data-astro-cid-rf56lckb></div> <!-- Card --> <div style="position:relative;z-index:10;width:100%;max-width:420px;" data-astro-cid-rf56lckb> <!-- Logo flotante --> <div style="text-align:center;margin-bottom:32px;" data-astro-cid-rf56lckb> <div style="display:inline-flex;align-items:center;justify-content:center;width:72px;height:72px;background:linear-gradient(135deg,#7c3aed,#ec4899);border-radius:20px;font-size:32px;box-shadow:0 16px 40px rgba(124,58,237,0.5),0 0 0 1px rgba(255,255,255,0.1);margin-bottom:20px;" data-astro-cid-rf56lckb>
🎟
</div> <h1 style="color:white;font-size:26px;font-weight:900;letter-spacing:-0.5px;margin-bottom:6px;" data-astro-cid-rf56lckb>Panel de Administración</h1> <p style="color:rgba(255,255,255,0.3);font-size:14px;" data-astro-cid-rf56lckb>Ingresa tus credenciales para continuar</p> </div> <!-- Card form --> <div style="background:rgba(15,15,26,0.85);border:1px solid rgba(255,255,255,0.08);border-radius:24px;padding:36px;backdrop-filter:blur(24px);box-shadow:0 32px 64px rgba(0,0,0,0.5),0 0 0 1px rgba(124,58,237,0.08),inset 0 1px 0 rgba(255,255,255,0.05);" data-astro-cid-rf56lckb> ${error && renderTemplate`<div style="background:rgba(239,68,68,0.1);border:1px solid rgba(239,68,68,0.25);color:#fca5a5;font-size:13px;padding:12px 16px;border-radius:12px;margin-bottom:24px;display:flex;align-items:center;gap:8px;" data-astro-cid-rf56lckb> <span data-astro-cid-rf56lckb>⚠️</span> ${error} </div>`} <form method="POST" style="display:flex;flex-direction:column;gap:20px;" data-astro-cid-rf56lckb> <div data-astro-cid-rf56lckb> <label style="display:block;color:rgba(255,255,255,0.35);font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:1px;margin-bottom:8px;" data-astro-cid-rf56lckb>
Correo electrónico
</label> <input type="email" name="email" required placeholder="admin@eventosapp.com" autocomplete="email" data-astro-cid-rf56lckb> </div> <div data-astro-cid-rf56lckb> <label style="display:block;color:rgba(255,255,255,0.35);font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:1px;margin-bottom:8px;" data-astro-cid-rf56lckb>
Contraseña
</label> <input type="password" name="password" required placeholder="••••••••" autocomplete="current-password" data-astro-cid-rf56lckb> </div> <button type="submit" class="btn-submit" style="margin-top:4px;" data-astro-cid-rf56lckb>
Ingresar al panel →
</button> </form> </div> <!-- Footer --> <p style="text-align:center;color:rgba(255,255,255,0.12);font-size:11px;margin-top:20px;" data-astro-cid-rf56lckb>
🔒 Acceso restringido — Solo administradores autorizados
</p> </div> </div> </body></html>`;
}, "C:/Users/Sat/OneDrive - SENATI/Desktop/Web de eventos + sistema de entradas y asistencia/eventos-app/src/pages/admin/login.astro", void 0);

const $$file = "C:/Users/Sat/OneDrive - SENATI/Desktop/Web de eventos + sistema de entradas y asistencia/eventos-app/src/pages/admin/login.astro";
const $$url = "/admin/login";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Login,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
