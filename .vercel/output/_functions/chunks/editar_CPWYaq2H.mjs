import { createServerClient } from './supabase_CuZ_5uQz.mjs';
import { i as isAuthenticated, g as getSessionUser } from './auth_Zqlk1v2P.mjs';

const POST = async ({ request, cookies, redirect }) => {
  if (!isAuthenticated(cookies)) return redirect("/admin/login");
  const currentUser = getSessionUser(cookies);
  if (currentUser?.rol !== "superadmin") {
    return redirect("/admin/usuarios?err=Sin+permisos");
  }
  const form = await request.formData();
  const id = form.get("id")?.trim();
  const email = form.get("email")?.trim();
  const nombre = form.get("nombre")?.trim() || null;
  const password = form.get("password")?.trim();
  const rol = form.get("rol") ?? "admin";
  if (!id || !email) {
    return redirect("/admin/usuarios?err=Datos+inválidos");
  }
  const db = createServerClient();
  const updates = { email, nombre, rol };
  if (password) {
    if (password.length < 6) {
      return redirect("/admin/usuarios?err=Contraseña+muy+corta+(mínimo+6+caracteres)");
    }
    updates.password = password;
  }
  const { error } = await db.from("admin_users").update(updates).eq("id", id);
  if (error) {
    const msg = error.message.includes("unique") ? "El+correo+ya+existe" : "Error+al+actualizar";
    return redirect(`/admin/usuarios?err=${msg}`);
  }
  return redirect("/admin/usuarios?ok=Usuario+actualizado+correctamente");
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
