import { createServerClient } from './supabase';

const SESSION_COOKIE = 'admin_session';

export interface AdminUser {
  id: string;
  email: string;
  nombre: string | null;
  rol: 'superadmin' | 'admin';
}

// Verifica credenciales contra la tabla admin_users (bcrypt via pgcrypto)
export async function isValidCredentials(email: string, password: string): Promise<AdminUser | null> {
  const db = createServerClient();
  const { data } = await db
    .from('admin_users')
    .select('id, email, nombre, rol')
    .eq('email', email)
    .eq('activo', true)
    .filter('password_hash', 'eq', db.rpc('crypt_check', { plain: password, hashed: '' }) as any)
    .single();

  // Usamos RPC para comparar con bcrypt
  const { data: user } = await db
    .rpc('verify_admin_password', { p_email: email, p_password: password })
    .single();

  return (user as AdminUser) ?? null;
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
  const payload = btoa(JSON.stringify(user));
  cookies.set(SESSION_COOKIE, payload, {
    path: '/',
    httpOnly: true,
    sameSite: 'lax',
    maxAge: 60 * 60 * 8, // 8 horas
  });
}

export function clearSessionCookie(cookies: { delete: Function }): void {
  cookies.delete(SESSION_COOKIE, { path: '/' });
}
