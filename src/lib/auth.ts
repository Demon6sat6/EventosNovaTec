// Auth simple basado en variables de entorno + cookie de sesión
// No requiere Supabase Auth

const SESSION_COOKIE = 'admin_session';
const SESSION_VALUE  = 'authenticated';

export function isValidCredentials(email: string, password: string): boolean {
  return (
    email    === import.meta.env.ADMIN_EMAIL &&
    password === import.meta.env.ADMIN_PASSWORD
  );
}

export function isAuthenticated(cookies: { get: (name: string) => { value: string } | undefined }): boolean {
  const cookie = cookies.get(SESSION_COOKIE);
  return cookie?.value === SESSION_VALUE;
}

export function setSessionCookie(cookies: { set: Function }): void {
  cookies.set(SESSION_COOKIE, SESSION_VALUE, {
    path: '/',
    httpOnly: true,
    sameSite: 'lax',
    maxAge: 60 * 60 * 8, // 8 horas
  });
}

export function clearSessionCookie(cookies: { delete: Function }): void {
  cookies.delete(SESSION_COOKIE, { path: '/' });
}
