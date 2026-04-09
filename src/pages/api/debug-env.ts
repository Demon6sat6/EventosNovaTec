import type { APIRoute } from 'astro';

export const GET: APIRoute = () => {
  return new Response(JSON.stringify({
    ADMIN_EMAIL: import.meta.env.ADMIN_EMAIL ?? 'NO DEFINIDO',
    ADMIN_PASSWORD: import.meta.env.ADMIN_PASSWORD ? '***definido***' : 'NO DEFINIDO',
    MODE: import.meta.env.MODE,
  }, null, 2), { headers: { 'Content-Type': 'application/json' } });
};
