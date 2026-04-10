import type { APIRoute } from 'astro';
import { createServerClient } from '../lib/supabase';

export const GET: APIRoute = async () => {
  const siteUrl = import.meta.env.PUBLIC_SITE_URL ?? 'https://eventos-nova-tec.vercel.app';
  const db = createServerClient();
  const { data: eventos } = await db
    .from('eventos')
    .select('slug, created_at')
    .eq('publicado', true);

  const staticPages = ['', '/mis-entradas'];
  const eventoPages = (eventos ?? []).map(e => `/eventos/${e.slug}`);
  const allPages = [...staticPages, ...eventoPages];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages.map(path => `  <url>
    <loc>${siteUrl}${path}</loc>
    <changefreq>weekly</changefreq>
    <priority>${path === '' ? '1.0' : '0.8'}</priority>
  </url>`).join('\n')}
</urlset>`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml' }
  });
};
