const SESSION_COOKIE = 'admin_session';
const SESSION_VALUE  = 'authenticated';

export function isValidCredentials(email: string, password: string): boolean {
  return (
    email    === import.meta.env.ADMIN_EMAIL &&
    password === import.meta.env.ADMIN_PASSWORD
  );
}

export function isAuthenticated(cookies: { get: (name: string) => { value: string } | undefined }): boolean {
  return cookies.get(SESSION_COOKIE)?.value === SESSION_VALUE;
}

export function setSessionCookie(cookies: { set: Function }): void {
  cookies.set(SESSION_COOKIE, SESSION_VALUE, {
    path: '/',
    httpOnly: true,
    sameSite: 'lax',
    secure: import.meta.env.PROD,
    maxAge: 60 * 60 * 8,
  });
}

export function clearSessionCookie(cookies: { delete: Function }): void {
  cookies.delete(SESSION_COOKIE, { path: '/' });
}
