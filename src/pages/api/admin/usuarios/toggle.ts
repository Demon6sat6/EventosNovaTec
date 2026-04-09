import type { APIRoute } from 'astro';
import { createServerClient } from '../../../../lib/supabase';
import { isAuthenticated, getSessionUser } from '../../../../lib/auth';

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  if (!isAuthenticated(cookies)) return redirect('/admin/login');

  const currentUser = getSessionUser(cookies);
  if (currentUser?.rol !== 'superadmin') {
    return redirect('/admin/usuarios?err=Sin+permisos');
  }

  const form = await request.formData();
  const id     = (form.get('id')     as string)?.trim();
  const activo = form.get('activo') === 'true';

  if (!id) return redirect('/admin/usuarios?err=ID+inválido');

  // No permitir desactivarse a sí mismo
  if (id === currentUser.id) {
    return redirect('/admin/usuarios?err=No+puedes+desactivar+tu+propia+cuenta');
  }

  const db = createServerClient();
  const { error } = await db.from('admin_users').update({ activo }).eq('id', id);

  if (error) return redirect('/admin/usuarios?err=Error+al+actualizar');

  const msg = activo ? 'Usuario+activado' : 'Usuario+desactivado';
  return redirect(`/admin/usuarios?ok=${msg}`);
};
