import { createServerClient } from './supabase_CuZ_5uQz.mjs';

const SESSION_COOKIE = "admin_session";
async function isValidCredentials(email, password) {
  const db = createServerClient();
  const { data, error } = await db.from("admin_users").select("id, email, nombre, rol").eq("email", email).eq("password", password).eq("activo", true).single();
  if (error || !data) return null;
  return data;
}
function isAuthenticated(cookies) {
  const cookie = cookies.get(SESSION_COOKIE);
  if (!cookie?.value) return false;
  try {
    const data = JSON.parse(atob(cookie.value));
    return !!data.id && !!data.email;
  } catch {
    return false;
  }
}
function getSessionUser(cookies) {
  const cookie = cookies.get(SESSION_COOKIE);
  if (!cookie?.value) return null;
  try {
    return JSON.parse(atob(cookie.value));
  } catch {
    return null;
  }
}
function setSessionCookie(cookies, user) {
  const payload = btoa(JSON.stringify({ id: user.id, email: user.email, nombre: user.nombre, rol: user.rol }));
  cookies.set(SESSION_COOKIE, payload, {
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    secure: true,
    maxAge: 60 * 60 * 8
  });
}
function clearSessionCookie(cookies) {
  cookies.delete(SESSION_COOKIE, { path: "/" });
}

export { isValidCredentials as a, clearSessionCookie as c, getSessionUser as g, isAuthenticated as i, setSessionCookie as s };
