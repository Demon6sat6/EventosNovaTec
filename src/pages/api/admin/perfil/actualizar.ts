import type { APIRoute } from 'astro';
import { createServerClient } from '../../../../lib/supabase';
import { isAuthenticated, getSessionUser, setSessionCookie, isValidCredentials } from '../../../../lib/auth';

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  if (!isAuthenticated(cookies)) return redirect('/admin/login');

  const currentUser = getSessionUser(cookies);
  if (!currentUser) return redirect('/admin/login');

  const form = await request.formData();
  const email            = (form.get('email')            as string)?.trim();
  const nombre           = (form.get('nombre')           as string)?.trim() || null;
  const currentPassword  = (form.get('current_password') as string)?.trim();
  const newPassword      = (form.get('new_password')     as string)?.trim();

  if (!email || !currentPassword) {
    return redirect('/admin/perfil?err=Completa+todos+los+campos+requeridos');
  }

  // Verificar contraseña actual
  const verified = await isValidCredentials(currentUser.email, currentPassword);
  if (!verified) {
    return redirect('/admin/perfil?err=Contraseña+actual+incorrecta');
  }

  const db = createServerClient();
  const updates: Record<string, unknown> = { email, nombre, updated_at: new Date().toISOString() };

  if (newPassword) {
    if (newPassword.length < 8) {
      return redirect('/admin/perfil?err=La+nueva+contraseña+debe+tener+al+menos+8+caracteres');
    }
    const { data: hash, error: hashErr } = await db.rpc('hash_password', { p_password: newPassword });
    if (hashErr || !hash) {
      return redirect('/admin/perfil?err=Error+al+procesar+contraseña');
    }
    updates.password_hash = hash;
  }

  const { error } = await db.from('admin_users').update(updates).eq('id', currentUser.id);

  if (error) {
    const msg = error.message.includes('unique') ? 'El+correo+ya+está+en+uso' : 'Error+al+actualizar';
    return redirect(`/admin/perfil?err=${msg}`);
  }

  // Actualizar cookie de sesión con nuevos datos
  setSessionCookie(cookies, { ...currentUser, email, nombre });

  return redirect('/admin/perfil?ok=Perfil+actualizado+correctamente');
};
