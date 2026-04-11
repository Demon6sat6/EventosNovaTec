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
  const email    = (form.get('email')    as string)?.trim();
  const password = (form.get('password') as string)?.trim();
  const nombre   = (form.get('nombre')   as string)?.trim() || null;
  const rol      = (form.get('rol')      as string) ?? 'admin';

  if (!email || !password || password.length < 6) {
    return redirect('/admin/usuarios?err=Datos+inválidos+o+contraseña+muy+corta');
  }

  const db = createServerClient();

  const { error } = await db.from('admin_users').insert({
    email,
    password,
    nombre,
    rol,
  });

  if (error) {
    const msg = error.message.includes('unique') ? 'El+correo+ya+existe' : 'Error+al+crear+usuario';
    return redirect(`/admin/usuarios?err=${msg}`);
  }

  return redirect('/admin/usuarios?ok=Usuario+creado+correctamente');
};
