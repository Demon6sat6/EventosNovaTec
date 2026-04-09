import { createServerClient } from './supabase';

const SESSION_COOKIE = 'admin_session';

export type AdminUser = {
  id: string;
  email: string;
  nombre: string | null;
  rol: 'admin' | 'superadmin';
};

// Valida contra la tabla admin_users de Supabase
export async function isValidCredentials(email: string, password: string): Promise<AdminUser | null> {
  const db = createServerClient();
  const { data, error } = await db
    .from('admin_users')
    .select('id, email, nombre, rol')
    .eq('email', email)
    .eq('password', password)
    .eq('activo', true)
    .single();

  if (error || !data) return null;
  return data as AdminUser;
}

export function isAuthenticated(cookies: { get: (name: string) => { value: string } | undefined }): boolean {
  const cookie = cookies.get(SESSION_COOKIE);
  if (!cookie?.value) return false;
  try {
    const data = JSON.parse(atob(cookie.value));
    return !!data.id && !!data.email;
  } catch {
    return false;
  }
}

export function getSessionUser(cookies: { get: (name: string) => { value: string } | undefined }): AdminUser | null {
  const cookie = cookies.get(SESSION_COOKIE);
  if (!cookie?.value) return null;
  try {
    return JSON.parse(atob(cookie.value)) as AdminUser;
  } catch {
    return null;
  }
}

export function setSessionCookie(cookies: { set: Function }, user: AdminUser): void {
  const payload = btoa(JSON.stringify({ id: user.id, email: user.email, nombre: user.nombre, rol: user.rol }));
  cookies.set(SESSION_COOKIE, payload, {
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
