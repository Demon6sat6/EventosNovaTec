import { c as createComponent } from './astro-component_CnPl_Uqv.mjs';
import 'piccolore';
import { T as renderTemplate, B as maybeRenderHead, a4 as addAttribute } from './sequence_jkwZ4rKh.mjs';
import { r as renderComponent } from './entrypoint_D5PyMbLA.mjs';
import { $ as $$AdminLayout } from './AdminLayout_Cf2CqdKK.mjs';
import { createServerClient } from './supabase_CuZ_5uQz.mjs';

const $$id = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$id;
  const { id } = Astro2.params;
  const db = createServerClient();
  let error = "";
  if (Astro2.request.method === "POST") {
    const form = await Astro2.request.formData();
    const titulo = form.get("titulo");
    const slug = titulo.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
    const { error: dbError } = await db.from("eventos").update({
      titulo,
      slug,
      descripcion: form.get("descripcion"),
      fecha: form.get("fecha"),
      lugar: form.get("lugar"),
      precio: Number(form.get("precio")),
      capacidad: Number(form.get("capacidad")),
      imagen_url: form.get("imagen_url") || null,
      publicado: form.get("publicado") === "on"
    }).eq("id", id);
    if (!dbError) return Astro2.redirect("/admin/eventos");
    error = dbError.message;
  }
  const { data: evento } = await db.from("eventos").select("*").eq("id", id).single();
  if (!evento) return Astro2.redirect("/admin/eventos");
  const fechaLocal = new Date(evento.fecha).toISOString().slice(0, 16);
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "Editar Evento" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div style="max-width:680px;"> ${error && renderTemplate`<div style="background:rgba(239,68,68,0.1);border:1px solid rgba(239,68,68,0.25);color:#f87171;font-size:13px;padding:12px 16px;border-radius:12px;margin-bottom:20px;">
⚠️ ${error} </div>`} <div style="background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.07);border-radius:20px;overflow:hidden;"> <div style="padding:20px 24px;border-bottom:1px solid rgba(255,255,255,0.06);background:rgba(124,58,237,0.05);display:flex;align-items:center;justify-content:space-between;"> <p style="color:#a78bfa;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;">Editar evento</p> <span${addAttribute(`padding:4px 12px;border-radius:100px;font-size:11px;font-weight:600;${evento.publicado ? "background:rgba(34,197,94,0.12);color:#4ade80;border:1px solid rgba(34,197,94,0.25);" : "background:rgba(255,255,255,0.05);color:rgba(255,255,255,0.3);border:1px solid rgba(255,255,255,0.1);"}`, "style")}> ${evento.publicado ? "● Publicado" : "○ Borrador"} </span> </div> <form method="POST" style="padding:24px;display:flex;flex-direction:column;gap:20px;"> <div> <label style="display:block;color:rgba(255,255,255,0.4);font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:1px;margin-bottom:8px;">Título *</label> <input name="titulo" required${addAttribute(evento.titulo, "value")} style="width:100%;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.1);color:white;border-radius:10px;padding:11px 14px;font-size:14px;outline:none;font-family:inherit;transition:border-color 0.2s,background 0.2s;box-sizing:border-box;" onfocus="this.style.borderColor='rgba(124,58,237,0.6)';this.style.background='rgba(124,58,237,0.05)'" onblur="this.style.borderColor='rgba(255,255,255,0.1)';this.style.background='rgba(255,255,255,0.04)'"> </div> <div> <label style="display:block;color:rgba(255,255,255,0.4);font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:1px;margin-bottom:8px;">Descripción</label> <textarea name="descripcion" rows="4" style="width:100%;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.1);color:white;border-radius:10px;padding:11px 14px;font-size:14px;outline:none;font-family:inherit;resize:vertical;transition:border-color 0.2s;box-sizing:border-box;" onfocus="this.style.borderColor='rgba(124,58,237,0.6)'" onblur="this.style.borderColor='rgba(255,255,255,0.1)'">${evento.descripcion}</textarea> </div> <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;"> <div> <label style="display:block;color:rgba(255,255,255,0.4);font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:1px;margin-bottom:8px;">Fecha y hora *</label> <input type="datetime-local" name="fecha" required${addAttribute(fechaLocal, "value")} style="width:100%;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.1);color:white;border-radius:10px;padding:11px 14px;font-size:14px;outline:none;font-family:inherit;transition:border-color 0.2s;box-sizing:border-box;color-scheme:dark;" onfocus="this.style.borderColor='rgba(124,58,237,0.6)'" onblur="this.style.borderColor='rgba(255,255,255,0.1)'"> </div> <div> <label style="display:block;color:rgba(255,255,255,0.4);font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:1px;margin-bottom:8px;">Lugar *</label> <input name="lugar" required${addAttribute(evento.lugar, "value")} style="width:100%;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.1);color:white;border-radius:10px;padding:11px 14px;font-size:14px;outline:none;font-family:inherit;transition:border-color 0.2s,background 0.2s;box-sizing:border-box;" onfocus="this.style.borderColor='rgba(124,58,237,0.6)';this.style.background='rgba(124,58,237,0.05)'" onblur="this.style.borderColor='rgba(255,255,255,0.1)';this.style.background='rgba(255,255,255,0.04)'"> </div> </div> <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;"> <div> <label style="display:block;color:rgba(255,255,255,0.4);font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:1px;margin-bottom:8px;">Precio (S/) *</label> <div style="position:relative;"> <span style="position:absolute;left:14px;top:50%;transform:translateY(-50%);color:rgba(255,255,255,0.3);font-size:14px;">S/</span> <input type="number" name="precio" min="0" step="0.01"${addAttribute(evento.precio, "value")} required style="width:100%;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.1);color:white;border-radius:10px;padding:11px 14px 11px 32px;font-size:14px;outline:none;font-family:inherit;transition:border-color 0.2s;box-sizing:border-box;" onfocus="this.style.borderColor='rgba(124,58,237,0.6)'" onblur="this.style.borderColor='rgba(255,255,255,0.1)'"> </div> </div> <div> <label style="display:block;color:rgba(255,255,255,0.4);font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:1px;margin-bottom:8px;">Capacidad *</label> <input type="number" name="capacidad" min="1"${addAttribute(evento.capacidad, "value")} required style="width:100%;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.1);color:white;border-radius:10px;padding:11px 14px;font-size:14px;outline:none;font-family:inherit;transition:border-color 0.2s;box-sizing:border-box;" onfocus="this.style.borderColor='rgba(124,58,237,0.6)'" onblur="this.style.borderColor='rgba(255,255,255,0.1)'"> </div> </div> <div> <label style="display:block;color:rgba(255,255,255,0.4);font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:1px;margin-bottom:8px;">URL de imagen <span style="color:rgba(255,255,255,0.2);font-weight:400;text-transform:none;">(opcional)</span></label> <input type="url" name="imagen_url"${addAttribute(evento.imagen_url ?? "", "value")} placeholder="https://ejemplo.com/imagen.jpg" style="width:100%;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.1);color:white;border-radius:10px;padding:11px 14px;font-size:14px;outline:none;font-family:inherit;transition:border-color 0.2s,background 0.2s;box-sizing:border-box;" onfocus="this.style.borderColor='rgba(124,58,237,0.6)';this.style.background='rgba(124,58,237,0.05)'" onblur="this.style.borderColor='rgba(255,255,255,0.1)';this.style.background='rgba(255,255,255,0.04)'"> </div> <div style="display:flex;align-items:center;gap:12px;padding:14px 16px;background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.06);border-radius:10px;"> <input type="checkbox" name="publicado" id="publicado"${addAttribute(evento.publicado, "checked")} style="width:16px;height:16px;accent-color:#7c3aed;cursor:pointer;"> <div> <label for="publicado" style="color:white;font-size:13px;font-weight:600;cursor:pointer;">Publicado</label> <p style="color:rgba(255,255,255,0.25);font-size:11px;margin-top:2px;">Visible en el sitio público</p> </div> </div> <div style="display:flex;gap:12px;padding-top:4px;"> <button type="submit" style="display:inline-flex;align-items:center;gap:8px;background:linear-gradient(135deg,#7c3aed,#ec4899);color:white;font-weight:700;font-size:14px;padding:12px 28px;border-radius:10px;border:none;cursor:pointer;font-family:inherit;box-shadow:0 4px 20px rgba(124,58,237,0.35);transition:transform 0.2s;" onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform='translateY(0)'">
✓ Guardar cambios
</button> <a href="/admin/eventos" style="display:inline-flex;align-items:center;padding:12px 24px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.1);color:rgba(255,255,255,0.5);font-size:14px;font-weight:500;border-radius:10px;text-decoration:none;transition:all 0.2s;" onmouseover="this.style.color='white';this.style.background='rgba(255,255,255,0.08)'" onmouseout="this.style.color='rgba(255,255,255,0.5)';this.style.background='rgba(255,255,255,0.04)'">
Cancelar
</a> </div> </form> </div> </div> ` })}`;
}, "C:/Users/Sat/OneDrive - SENATI/Desktop/Web de eventos + sistema de entradas y asistencia/eventos-app/src/pages/admin/eventos/[id].astro", void 0);

const $$file = "C:/Users/Sat/OneDrive - SENATI/Desktop/Web de eventos + sistema de entradas y asistencia/eventos-app/src/pages/admin/eventos/[id].astro";
const $$url = "/admin/eventos/[id]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$id,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
