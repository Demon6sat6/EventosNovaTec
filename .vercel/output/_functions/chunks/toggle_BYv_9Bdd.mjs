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
  const activo = form.get("activo") === "true";
  if (!id) return redirect("/admin/usuarios?err=ID+inválido");
  if (id === currentUser.id) {
    return redirect("/admin/usuarios?err=No+puedes+desactivar+tu+propia+cuenta");
  }
  const db = createServerClient();
  const { error } = await db.from("admin_users").update({ activo }).eq("id", id);
  if (error) return redirect("/admin/usuarios?err=Error+al+actualizar");
  const msg = activo ? "Usuario+activado" : "Usuario+desactivado";
  return redirect(`/admin/usuarios?ok=${msg}`);
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
