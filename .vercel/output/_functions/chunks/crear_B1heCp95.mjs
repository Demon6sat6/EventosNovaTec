import { createServerClient } from './supabase_CuZ_5uQz.mjs';
import { i as isAuthenticated, g as getSessionUser } from './auth_Zqlk1v2P.mjs';

const POST = async ({ request, cookies, redirect }) => {
  if (!isAuthenticated(cookies)) return redirect("/admin/login");
  const currentUser = getSessionUser(cookies);
  if (currentUser?.rol !== "superadmin") {
    return redirect("/admin/usuarios?err=Sin+permisos");
  }
  const form = await request.formData();
  const email = form.get("email")?.trim();
  const password = form.get("password")?.trim();
  const nombre = form.get("nombre")?.trim() || null;
  const rol = form.get("rol") ?? "admin";
  if (!email || !password || password.length < 8) {
    return redirect("/admin/usuarios?err=Datos+inválidos+o+contraseña+muy+corta");
  }
  const db = createServerClient();
  const { data: hash, error: hashErr } = await db.rpc("hash_password", { p_password: password });
  if (hashErr || !hash) {
    return redirect("/admin/usuarios?err=Error+al+procesar+contraseña");
  }
  const { error } = await db.from("admin_users").insert({
    email,
    password_hash: hash,
    nombre,
    rol
  });
  if (error) {
    const msg = error.message.includes("unique") ? "El+correo+ya+existe" : "Error+al+crear+usuario";
    return redirect(`/admin/usuarios?err=${msg}`);
  }
  return redirect("/admin/usuarios?ok=Usuario+creado+correctamente");
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
