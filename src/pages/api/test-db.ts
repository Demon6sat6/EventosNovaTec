import type { APIRoute } from 'astro';
import { supabase, createServerClient } from '../../lib/supabase';

export const GET: APIRoute = async () => {
  // Test con anon key (lo que usa el sitio público)
  const { data: publicData, error: publicError } = await supabase
    .from('eventos')
    .select('id, titulo, publicado')
    .limit(10);

  // Test con service role (lo que usa el admin)
  const db = createServerClient();
  const { data: adminData, error: adminError } = await db
    .from('eventos')
    .select('id, titulo, publicado')
    .limit(10);

  return new Response(JSON.stringify({
    public: { data: publicData, error: publicError?.message },
    admin:  { data: adminData,  error: adminError?.message },
  }, null, 2), {
    headers: { 'Content-Type': 'application/json' }
  });
};
