import type { APIRoute } from 'astro';
import { createServerClient } from '../../../../lib/supabase';
import { isAuthenticated, getSessionUser, setSessionCookie } from '../../../../lib/auth';

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  if (!isAuthenticated(cookies)) return redirect('/admin/login');

  const currentUser = getSessionUser(cookies);
  if (currentUser?.rol !== 'superadmin') {
    return redirect('/admin/usuarios?err=Sin+permisos');
  }

  const form = await request.formData();
  const id       = (form.get('id')       as string)?.trim();
  const email    = (form.get('email')    as string)?.trim();
  const nombre   = (form.get('nombre')   as string)?.trim() || null;
  const password = (form.get('password') as string)?.trim();
  const rol      = (form.get('rol')      as string) ?? 'admin';

  if (!id || !email) {
    return redirect('/admin/usuarios?err=Datos+inválidos');
  }

  const db = createServerClient();
  const updates: Record<string, unknown> = { email, nombre, rol };

  if (password) {
    if (password.length < 6) {
      return redirect('/admin/usuarios?err=Contraseña+muy+corta+(mínimo+6+caracteres)');
    }
    updates.password = password;
  }

  const { error } = await db.from('admin_users').update(updates).eq('id', id);

  if (error) {
    const msg = error.message.includes('unique') ? 'El+correo+ya+existe' : 'Error+al+actualizar';
    return redirect(`/admin/usuarios?err=${msg}`);
  }

  return redirect('/admin/usuarios?ok=Usuario+actualizado+correctamente');
};
