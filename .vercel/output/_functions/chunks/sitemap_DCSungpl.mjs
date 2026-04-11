import { createServerClient } from './supabase_CuZ_5uQz.mjs';

const GET = async () => {
  const siteUrl = "http://localhost:4321";
  const db = createServerClient();
  const { data: eventos } = await db.from("eventos").select("slug, created_at").eq("publicado", true);
  const staticPages = ["", "/mis-entradas"];
  const eventoPages = (eventos ?? []).map((e) => `/eventos/${e.slug}`);
  const allPages = [...staticPages, ...eventoPages];
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages.map((path) => `  <url>
    <loc>${siteUrl}${path}</loc>
    <changefreq>weekly</changefreq>
    <priority>${path === "" ? "1.0" : "0.8"}</priority>
  </url>`).join("\n")}
</urlset>`;
  return new Response(xml, {
    headers: { "Content-Type": "application/xml" }
  });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
