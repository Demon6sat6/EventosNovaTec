import { c as createComponent } from './astro-component_CnPl_Uqv.mjs';
import 'piccolore';
import { T as renderTemplate, B as maybeRenderHead, a4 as addAttribute, F as Fragment } from './sequence_jkwZ4rKh.mjs';
import { r as renderComponent } from './entrypoint_B7Ywt9HA.mjs';
import { $ as $$AdminLayout } from './AdminLayout_Dkk_-xhQ.mjs';
import { createServerClient } from './supabase_CuZ_5uQz.mjs';
import { g as getSessionUser } from './auth_Zqlk1v2P.mjs';

const $$Usuarios = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Usuarios;
  const currentUser = getSessionUser(Astro2.cookies);
  if (currentUser?.rol !== "superadmin") return Astro2.redirect("/admin");
  const db = createServerClient();
  let error = "";
  let success = "";
  if (Astro2.request.method === "POST") {
    const form = await Astro2.request.formData();
    const action = form.get("action");
    if (action === "crear") {
      const { error: e } = await db.from("admin_users").insert({
        email: form.get("email"),
        password: form.get("password"),
        nombre: form.get("nombre"),
        rol: form.get("rol")
      });
      if (e) error = e.message;
      else success = "Usuario creado correctamente";
    }
    if (action === "eliminar") {
      const id = form.get("id");
      if (id === currentUser.id) {
        error = "No puedes eliminarte a ti mismo";
      } else {
        await db.from("admin_users").delete().eq("id", id);
        success = "Usuario eliminado";
      }
    }
    if (action === "toggle") {
      const id = form.get("id");
      const activo = form.get("activo") === "true";
      await db.from("admin_users").update({ activo: !activo }).eq("id", id);
      success = `Usuario ${activo ? "desactivado" : "activado"}`;
    }
  }
  const { data: usuarios } = await db.from("admin_users").select("id, email, nombre, rol, activo, created_at").order("created_at", { ascending: false });
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "Gestión de Usuarios" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div style="max-width:860px;display:flex;flex-direction:column;gap:24px;"> ${error && renderTemplate`<div style="background:rgba(239,68,68,0.1);border:1px solid rgba(239,68,68,0.25);color:#f87171;font-size:13px;padding:12px 16px;border-radius:12px;">⚠️ ${error}</div>`} ${success && renderTemplate`<div style="background:rgba(34,197,94,0.1);border:1px solid rgba(34,197,94,0.25);color:#4ade80;font-size:13px;padding:12px 16px;border-radius:12px;">✅ ${success}</div>`} <!-- Crear usuario --> <div style="background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.07);border-radius:20px;overflow:hidden;"> <div style="padding:18px 24px;border-bottom:1px solid rgba(255,255,255,0.06);background:rgba(124,58,237,0.05);"> <p style="color:#a78bfa;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;">Crear nuevo usuario</p> </div> <form method="POST" style="padding:24px;display:grid;grid-template-columns:1fr 1fr;gap:16px;"> <input type="hidden" name="action" value="crear"> <div> <label style="display:block;color:rgba(255,255,255,0.35);font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:1px;margin-bottom:8px;">Nombre</label> <input name="nombre" placeholder="Nombre completo" style="width:100%;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.1);color:white;border-radius:10px;padding:10px 14px;font-size:13px;outline:none;font-family:inherit;box-sizing:border-box;" onfocus="this.style.borderColor='rgba(124,58,237,0.6)'" onblur="this.style.borderColor='rgba(255,255,255,0.1)'"> </div> <div> <label style="display:block;color:rgba(255,255,255,0.35);font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:1px;margin-bottom:8px;">Email *</label> <input type="email" name="email" required placeholder="usuario@ejemplo.com" style="width:100%;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.1);color:white;border-radius:10px;padding:10px 14px;font-size:13px;outline:none;font-family:inherit;box-sizing:border-box;" onfocus="this.style.borderColor='rgba(124,58,237,0.6)'" onblur="this.style.borderColor='rgba(255,255,255,0.1)'"> </div> <div> <label style="display:block;color:rgba(255,255,255,0.35);font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:1px;margin-bottom:8px;">Contraseña *</label> <input type="password" name="password" required placeholder="••••••••" style="width:100%;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.1);color:white;border-radius:10px;padding:10px 14px;font-size:13px;outline:none;font-family:inherit;box-sizing:border-box;" onfocus="this.style.borderColor='rgba(124,58,237,0.6)'" onblur="this.style.borderColor='rgba(255,255,255,0.1)'"> </div> <div> <label style="display:block;color:rgba(255,255,255,0.35);font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:1px;margin-bottom:8px;">Rol *</label> <select name="rol" style="width:100%;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.1);color:white;border-radius:10px;padding:10px 14px;font-size:13px;outline:none;font-family:inherit;box-sizing:border-box;color-scheme:dark;"> <option value="admin">Admin</option> <option value="superadmin">Superadmin</option> </select> </div> <div style="grid-column:1/-1;"> <button type="submit" style="background:linear-gradient(135deg,#7c3aed,#ec4899);color:white;font-weight:700;font-size:13px;padding:11px 24px;border-radius:10px;border:none;cursor:pointer;font-family:inherit;box-shadow:0 4px 16px rgba(124,58,237,0.3);">
➕ Crear usuario
</button> </div> </form> </div> <!-- Lista de usuarios --> <div style="background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.07);border-radius:20px;overflow:hidden;"> <div style="padding:18px 24px;border-bottom:1px solid rgba(255,255,255,0.06);display:flex;align-items:center;justify-content:space-between;"> <p style="color:#a78bfa;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;">Usuarios registrados</p> <span style="background:rgba(255,255,255,0.05);color:rgba(255,255,255,0.4);font-size:11px;padding:3px 10px;border-radius:100px;">${usuarios?.length ?? 0} usuarios</span> </div> <!-- Header tabla --> <div style="display:grid;grid-template-columns:1fr 1fr 90px 100px 120px;padding:10px 20px;border-bottom:1px solid rgba(255,255,255,0.04);background:rgba(255,255,255,0.01);"> ${["Nombre", "Email", "Rol", "Estado", "Acciones"].map((h) => renderTemplate`<span style="color:rgba(255,255,255,0.2);font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:1px;">${h}</span>`)} </div> ${usuarios?.map((u, i) => renderTemplate`<div${addAttribute(`display:grid;grid-template-columns:1fr 1fr 90px 100px 120px;padding:13px 20px;align-items:center;${i < usuarios.length - 1 ? "border-bottom:1px solid rgba(255,255,255,0.03);" : ""}`, "style")}> <div style="display:flex;align-items:center;gap:10px;"> <div style="width:30px;height:30px;background:linear-gradient(135deg,#7c3aed,#ec4899);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;flex-shrink:0;"> ${(u.nombre ?? u.email).charAt(0).toUpperCase()} </div> <span style="color:white;font-size:13px;font-weight:500;">${u.nombre ?? "—"}</span> </div> <span style="color:rgba(255,255,255,0.4);font-size:12px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${u.email}</span> <span${addAttribute(`display:inline-block;padding:3px 10px;border-radius:100px;font-size:11px;font-weight:600;${u.rol === "superadmin" ? "background:rgba(124,58,237,0.15);color:#a78bfa;border:1px solid rgba(124,58,237,0.3);" : "background:rgba(255,255,255,0.05);color:rgba(255,255,255,0.4);border:1px solid rgba(255,255,255,0.1);"}`, "style")}> ${u.rol} </span> <span${addAttribute(`display:inline-block;padding:3px 10px;border-radius:100px;font-size:11px;font-weight:600;${u.activo ? "background:rgba(34,197,94,0.1);color:#4ade80;border:1px solid rgba(34,197,94,0.2);" : "background:rgba(239,68,68,0.1);color:#f87171;border:1px solid rgba(239,68,68,0.2);"}`, "style")}> ${u.activo ? "● Activo" : "○ Inactivo"} </span> <div style="display:flex;gap:6px;"> ${u.id !== currentUser?.id && renderTemplate`${renderComponent($$result2, "Fragment", Fragment, {}, { "default": async ($$result3) => renderTemplate` <form method="POST" style="display:inline;"> <input type="hidden" name="action" value="toggle"> <input type="hidden" name="id"${addAttribute(u.id, "value")}> <input type="hidden" name="activo"${addAttribute(String(u.activo), "value")}> <button type="submit"${addAttribute(`font-size:11px;font-weight:600;padding:4px 10px;border-radius:6px;border:none;cursor:pointer;font-family:inherit;${u.activo ? "background:rgba(245,158,11,0.1);color:#fbbf24;border:1px solid rgba(245,158,11,0.2);" : "background:rgba(34,197,94,0.1);color:#4ade80;border:1px solid rgba(34,197,94,0.2);"}`, "style")}> ${u.activo ? "Desactivar" : "Activar"} </button> </form> <form method="POST" style="display:inline;" onsubmit="return confirm('¿Eliminar este usuario?')"> <input type="hidden" name="action" value="eliminar"> <input type="hidden" name="id"${addAttribute(u.id, "value")}> <button type="submit" style="font-size:11px;font-weight:600;padding:4px 10px;border-radius:6px;background:rgba(239,68,68,0.1);color:#f87171;border:1px solid rgba(239,68,68,0.2);cursor:pointer;font-family:inherit;">
Eliminar
</button> </form> ` })}`} ${u.id === currentUser?.id && renderTemplate`<span style="color:rgba(255,255,255,0.2);font-size:11px;">(tú)</span>`} </div> </div>`)} </div> </div> ` })}`;
}, "C:/Users/Sat/OneDrive - SENATI/Desktop/Web de eventos + sistema de entradas y asistencia/eventos-app/src/pages/admin/usuarios.astro", void 0);

const $$file = "C:/Users/Sat/OneDrive - SENATI/Desktop/Web de eventos + sistema de entradas y asistencia/eventos-app/src/pages/admin/usuarios.astro";
const $$url = "/admin/usuarios";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Usuarios,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
