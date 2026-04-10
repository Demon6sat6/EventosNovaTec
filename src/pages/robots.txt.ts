import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ site }) => {
  const siteUrl = import.meta.env.PUBLIC_SITE_URL ?? 'https://eventos-nova-tec.vercel.app';
  return new Response(
    `User-agent: *\nAllow: /\nDisallow: /admin\n\nSitemap: ${siteUrl}/sitemap.xml`,
    { headers: { 'Content-Type': 'text/plain' } }
  );
};
