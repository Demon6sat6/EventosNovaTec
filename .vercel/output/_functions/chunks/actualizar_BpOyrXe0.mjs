import { createServerClient } from './supabase_CuZ_5uQz.mjs';
import { i as isAuthenticated, g as getSessionUser, a as isValidCredentials, s as setSessionCookie } from './auth_Zqlk1v2P.mjs';

const POST = async ({ request, cookies, redirect }) => {
  if (!isAuthenticated(cookies)) return redirect("/admin/login");
  const currentUser = getSessionUser(cookies);
  if (!currentUser) return redirect("/admin/login");
  const form = await request.formData();
  const email = form.get("email")?.trim();
  const nombre = form.get("nombre")?.trim() || null;
  const currentPassword = form.get("current_password")?.trim();
  const newPassword = form.get("new_password")?.trim();
  if (!email || !currentPassword) {
    return redirect("/admin/perfil?err=Completa+todos+los+campos+requeridos");
  }
  const verified = await isValidCredentials(currentUser.email, currentPassword);
  if (!verified) {
    return redirect("/admin/perfil?err=Contraseña+actual+incorrecta");
  }
  const db = createServerClient();
  const updates = { email, nombre };
  if (newPassword) {
    if (newPassword.length < 6) {
      return redirect("/admin/perfil?err=La+nueva+contraseña+debe+tener+al+menos+6+caracteres");
    }
    updates.password = newPassword;
  }
  const { error } = await db.from("admin_users").update(updates).eq("id", currentUser.id);
  if (error) {
    const msg = error.message.includes("unique") ? "El+correo+ya+está+en+uso" : "Error+al+actualizar";
    return redirect(`/admin/perfil?err=${msg}`);
  }
  setSessionCookie(cookies, { ...currentUser, email, nombre });
  return redirect("/admin/perfil?ok=Perfil+actualizado+correctamente");
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
