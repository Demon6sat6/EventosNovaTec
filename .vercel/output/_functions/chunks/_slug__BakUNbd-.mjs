import { c as createComponent } from './astro-component_CnPl_Uqv.mjs';
import 'piccolore';
import { T as renderTemplate, F as Fragment$1, B as maybeRenderHead, a4 as addAttribute } from './sequence_jkwZ4rKh.mjs';
import { r as renderComponent } from './entrypoint_D5PyMbLA.mjs';
import { $ as $$Layout } from './Layout_ChXH6dN_.mjs';
import { createServerClient } from './supabase_CuZ_5uQz.mjs';
import { jsxs, jsx, Fragment } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';

function BuyTicket({ eventoId, eventoTitulo, precio, disponibles }) {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [cantidad, setCantidad] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const total = precio * cantidad;
  const inputStyle = {
    width: "100%",
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.1)",
    color: "white",
    borderRadius: "12px",
    padding: "13px 16px",
    fontSize: "14px",
    outline: "none",
    fontFamily: "inherit",
    transition: "border-color 0.2s, background 0.2s",
    boxSizing: "border-box"
  };
  const labelStyle = {
    display: "block",
    color: "rgba(255,255,255,0.35)",
    fontSize: "11px",
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "1px",
    marginBottom: "8px"
  };
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/comprar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ eventoId, nombre, email, cantidad })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Error al procesar");
      const totalTexto = precio === 0 ? "GRATIS" : `S/ ${(precio * cantidad).toFixed(2)}`;
      const msg = encodeURIComponent(
        `🎟 *Nueva reserva - EventosApp*

*Evento:* ${eventoTitulo}
*Asistente:* ${nombre}
*Email:* ${email}
*Cantidad:* ${cantidad} entrada${cantidad > 1 ? "s" : ""}
*Total:* ${totalTexto}
*ID Reserva:* ${data.entradaId}

_Una vez confirmado el pago, recibirás tu código QR de acceso._`
      );
      window.open(`https://wa.me/51993034435?text=${msg}`, "_blank");
      window.location.href = `/entrada/${data.entradaId}`;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }
  return /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, children: [
    /* @__PURE__ */ jsxs("div", { style: { display: "flex", flexDirection: "column", gap: "16px", marginBottom: "20px" }, children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { style: labelStyle, children: "Nombre completo" }),
        /* @__PURE__ */ jsxs("div", { style: { position: "relative" }, children: [
          /* @__PURE__ */ jsxs(
            "svg",
            {
              style: { position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", opacity: 0.3 },
              width: "15",
              height: "15",
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "white",
              strokeWidth: "2",
              children: [
                /* @__PURE__ */ jsx("path", { d: "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" }),
                /* @__PURE__ */ jsx("circle", { cx: "12", cy: "7", r: "4" })
              ]
            }
          ),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              required: true,
              value: nombre,
              onChange: (e) => setNombre(e.target.value),
              placeholder: "Tu nombre completo",
              style: { ...inputStyle, paddingLeft: "42px" },
              onFocus: (e) => {
                e.target.style.borderColor = "rgba(124,58,237,0.6)";
                e.target.style.background = "rgba(124,58,237,0.05)";
              },
              onBlur: (e) => {
                e.target.style.borderColor = "rgba(255,255,255,0.1)";
                e.target.style.background = "rgba(255,255,255,0.04)";
              }
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { style: labelStyle, children: "Correo electrónico" }),
        /* @__PURE__ */ jsxs("div", { style: { position: "relative" }, children: [
          /* @__PURE__ */ jsxs(
            "svg",
            {
              style: { position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", opacity: 0.3 },
              width: "15",
              height: "15",
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "white",
              strokeWidth: "2",
              children: [
                /* @__PURE__ */ jsx("rect", { x: "2", y: "4", width: "20", height: "16", rx: "2" }),
                /* @__PURE__ */ jsx("path", { d: "m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" })
              ]
            }
          ),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "email",
              required: true,
              value: email,
              onChange: (e) => setEmail(e.target.value),
              placeholder: "tu@email.com",
              style: { ...inputStyle, paddingLeft: "42px" },
              onFocus: (e) => {
                e.target.style.borderColor = "rgba(124,58,237,0.6)";
                e.target.style.background = "rgba(124,58,237,0.05)";
              },
              onBlur: (e) => {
                e.target.style.borderColor = "rgba(255,255,255,0.1)";
                e.target.style.background = "rgba(255,255,255,0.04)";
              }
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { style: labelStyle, children: "Cantidad de entradas" }),
        /* @__PURE__ */ jsxs("div", { style: { display: "flex", gap: "10px", alignItems: "center" }, children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: () => setCantidad((c) => Math.max(1, c - 1)),
              style: { width: "42px", height: "42px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "white", borderRadius: "10px", fontSize: "18px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "all 0.2s" },
              onMouseOver: (e) => e.currentTarget.style.background = "rgba(124,58,237,0.15)",
              onMouseOut: (e) => e.currentTarget.style.background = "rgba(255,255,255,0.05)",
              children: "−"
            }
          ),
          /* @__PURE__ */ jsxs("div", { style: { flex: 1, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "10px", padding: "10px 16px", textAlign: "center", fontSize: "16px", fontWeight: 700, color: "white" }, children: [
            cantidad,
            " ",
            cantidad === 1 ? "entrada" : "entradas"
          ] }),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: () => setCantidad((c) => Math.min(disponibles, c + 1)),
              style: { width: "42px", height: "42px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "white", borderRadius: "10px", fontSize: "18px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "all 0.2s" },
              onMouseOver: (e) => e.currentTarget.style.background = "rgba(124,58,237,0.15)",
              onMouseOut: (e) => e.currentTarget.style.background = "rgba(255,255,255,0.05)",
              children: "+"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("p", { style: { color: "rgba(255,255,255,0.2)", fontSize: "11px", marginTop: "6px" }, children: [
          "Máximo ",
          disponibles,
          " disponibles"
        ] })
      ] })
    ] }),
    error && /* @__PURE__ */ jsxs("div", { style: { background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.25)", color: "#f87171", fontSize: "13px", padding: "12px 14px", borderRadius: "10px", marginBottom: "16px", display: "flex", alignItems: "center", gap: "8px" }, children: [
      /* @__PURE__ */ jsxs("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: [
        /* @__PURE__ */ jsx("circle", { cx: "12", cy: "12", r: "10" }),
        /* @__PURE__ */ jsx("line", { x1: "12", y1: "8", x2: "12", y2: "12" }),
        /* @__PURE__ */ jsx("line", { x1: "12", y1: "16", x2: "12.01", y2: "16" })
      ] }),
      error
    ] }),
    /* @__PURE__ */ jsxs("div", { style: { background: "rgba(124,58,237,0.06)", border: "1px solid rgba(124,58,237,0.15)", borderRadius: "14px", padding: "16px", marginBottom: "16px" }, children: [
      /* @__PURE__ */ jsxs("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: precio > 0 && cantidad > 1 ? "8px" : "0" }, children: [
        /* @__PURE__ */ jsxs("span", { style: { color: "rgba(255,255,255,0.4)", fontSize: "13px" }, children: [
          cantidad,
          " × ",
          precio === 0 ? "Gratis" : `S/ ${precio}`
        ] }),
        /* @__PURE__ */ jsx("span", { style: { color: "white", fontWeight: 800, fontSize: "20px", background: "linear-gradient(135deg,#a78bfa,#f472b6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }, children: precio === 0 ? "GRATIS" : `S/ ${total.toFixed(2)}` })
      ] }),
      precio > 0 && cantidad > 1 && /* @__PURE__ */ jsxs("p", { style: { color: "rgba(255,255,255,0.2)", fontSize: "11px", textAlign: "right" }, children: [
        "S/ ",
        precio,
        " por entrada"
      ] })
    ] }),
    /* @__PURE__ */ jsx(
      "button",
      {
        type: "submit",
        disabled: loading,
        style: {
          width: "100%",
          background: loading ? "rgba(124,58,237,0.4)" : "linear-gradient(135deg,#7c3aed,#ec4899)",
          color: "white",
          fontWeight: 700,
          fontSize: "15px",
          padding: "15px",
          borderRadius: "14px",
          border: "none",
          cursor: loading ? "not-allowed" : "pointer",
          fontFamily: "inherit",
          letterSpacing: "0.5px",
          boxShadow: loading ? "none" : "0 8px 32px rgba(124,58,237,0.4), inset 0 1px 0 rgba(255,255,255,0.15)",
          transition: "all 0.2s",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px"
        },
        onMouseOver: (e) => {
          if (!loading) e.currentTarget.style.transform = "translateY(-2px)";
        },
        onMouseOut: (e) => {
          e.currentTarget.style.transform = "translateY(0)";
        },
        children: loading ? /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx("svg", { style: { animation: "spin 1s linear infinite" }, width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: /* @__PURE__ */ jsx("path", { d: "M21 12a9 9 0 1 1-6.219-8.56" }) }),
          "Procesando..."
        ] }) : precio === 0 ? /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsxs("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", children: [
            /* @__PURE__ */ jsx("path", { d: "M20 12V22H4V12" }),
            /* @__PURE__ */ jsx("path", { d: "M22 7H2v5h20V7z" }),
            /* @__PURE__ */ jsx("path", { d: "M12 22V7" }),
            /* @__PURE__ */ jsx("path", { d: "M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" }),
            /* @__PURE__ */ jsx("path", { d: "M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" })
          ] }),
          "Reservar gratis"
        ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsxs("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", children: [
            /* @__PURE__ */ jsx("rect", { x: "1", y: "4", width: "22", height: "16", rx: "2", ry: "2" }),
            /* @__PURE__ */ jsx("line", { x1: "1", y1: "10", x2: "23", y2: "10" })
          ] }),
          "Comprar entrada"
        ] })
      }
    ),
    /* @__PURE__ */ jsxs("p", { style: { color: "rgba(255,255,255,0.15)", fontSize: "11px", textAlign: "center", marginTop: "12px", display: "flex", alignItems: "center", justifyContent: "center", gap: "5px" }, children: [
      /* @__PURE__ */ jsxs("svg", { width: "11", height: "11", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: [
        /* @__PURE__ */ jsx("rect", { x: "3", y: "11", width: "18", height: "11", rx: "2", ry: "2" }),
        /* @__PURE__ */ jsx("path", { d: "M7 11V7a5 5 0 0 1 10 0v4" })
      ] }),
      "Pago 100% seguro"
    ] }),
    /* @__PURE__ */ jsx("style", { children: `@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }` })
  ] });
}

function Countdown({ fecha }) {
  const [tiempo, setTiempo] = useState({ dias: 0, horas: 0, minutos: 0, segundos: 0, pasado: false });
  useEffect(() => {
    const calcular = () => {
      const diff = new Date(fecha).getTime() - Date.now();
      if (diff <= 0) {
        setTiempo((t) => ({ ...t, pasado: true }));
        return;
      }
      setTiempo({
        dias: Math.floor(diff / 864e5),
        horas: Math.floor(diff % 864e5 / 36e5),
        minutos: Math.floor(diff % 36e5 / 6e4),
        segundos: Math.floor(diff % 6e4 / 1e3),
        pasado: false
      });
    };
    calcular();
    const id = setInterval(calcular, 1e3);
    return () => clearInterval(id);
  }, [fecha]);
  if (tiempo.pasado) return /* @__PURE__ */ jsx("div", { style: { textAlign: "center", padding: "16px", background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.2)", borderRadius: "14px" }, children: /* @__PURE__ */ jsx("p", { style: { color: "#4ade80", fontWeight: 700, fontSize: "14px" }, children: "El evento ya comenzó" }) });
  const bloques = [
    { val: tiempo.dias, label: "Días" },
    { val: tiempo.horas, label: "Horas" },
    { val: tiempo.minutos, label: "Minutos" },
    { val: tiempo.segundos, label: "Segundos" }
  ];
  return /* @__PURE__ */ jsxs("div", { style: { marginBottom: "20px" }, children: [
    /* @__PURE__ */ jsx("p", { style: { color: "rgba(255,255,255,0.3)", fontSize: "11px", textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: "10px", textAlign: "center" }, children: "Faltan" }),
    /* @__PURE__ */ jsx("div", { className: "countdown-grid", children: bloques.map((b) => /* @__PURE__ */ jsxs("div", { style: { background: "rgba(124,58,237,0.08)", border: "1px solid rgba(124,58,237,0.15)", borderRadius: "12px", padding: "12px 8px", textAlign: "center" }, children: [
      /* @__PURE__ */ jsx("p", { style: { color: "white", fontWeight: 900, fontSize: "24px", lineHeight: 1, marginBottom: "4px", fontVariantNumeric: "tabular-nums" }, children: String(b.val).padStart(2, "0") }),
      /* @__PURE__ */ jsx("p", { style: { color: "rgba(255,255,255,0.25)", fontSize: "10px", textTransform: "uppercase", letterSpacing: "1px" }, children: b.label })
    ] }, b.label)) })
  ] });
}

const $$slug = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$slug;
  const { slug } = Astro2.params;
  const db = createServerClient();
  const { data: evento } = await db.from("eventos").select("*").eq("slug", slug).eq("publicado", true).single();
  if (!evento) return Astro2.redirect("/");
  const { count } = await db.from("entradas").select("*", { count: "exact", head: true }).eq("evento_id", evento.id).in("estado", ["pagado", "asistio"]);
  const disponibles = evento.capacidad - (count ?? 0);
  const pct = Math.round((count ?? 0) / evento.capacidad * 100);
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": evento.titulo, "description": evento.descripcion?.slice(0, 160), "image": evento.imagen_url ?? void 0, "data-astro-cid-xkgdao2y": true }, { "default": async ($$result2) => renderTemplate`   ${maybeRenderHead()}<section style="position:relative;overflow:hidden;min-height:480px;display:flex;align-items:flex-end;" data-astro-cid-xkgdao2y> ${evento.imagen_url ? renderTemplate`<img${addAttribute(evento.imagen_url, "src")}${addAttribute(evento.titulo, "alt")} width="1280" height="480" fetchpriority="high" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;filter:brightness(0.35) saturate(1.3);" data-astro-cid-xkgdao2y>` : renderTemplate`<div style="position:absolute;inset:0;background:linear-gradient(135deg,#0d0520,#1a0530,#0d0520);" data-astro-cid-xkgdao2y></div>`} <div style="position:absolute;inset:0;background:linear-gradient(to top,#02020a 0%,rgba(2,2,10,0.5) 50%,transparent 100%);" data-astro-cid-xkgdao2y></div> <div style="position:absolute;inset:0;" class="cyber-grid" style="opacity:0.3;" data-astro-cid-xkgdao2y></div> <!-- Orbes --> <div style="position:absolute;top:20%;left:10%;width:300px;height:300px;background:radial-gradient(circle,rgba(124,58,237,0.15),transparent 70%);border-radius:50%;pointer-events:none;" class="float" data-astro-cid-xkgdao2y></div> <div style="position:absolute;top:10%;right:10%;width:250px;height:250px;background:radial-gradient(circle,rgba(236,72,153,0.1),transparent 70%);border-radius:50%;pointer-events:none;" class="float2" data-astro-cid-xkgdao2y></div> <div style="position:relative;z-index:10;max-width:1280px;margin:0 auto;width:100%;" class="hero-pad" data-astro-cid-xkgdao2y> <a href="/" style="display:inline-flex;align-items:center;gap:6px;color:rgba(255,255,255,0.4);text-decoration:none;font-size:13px;margin-bottom:24px;transition:color 0.2s;" onmouseover="this.style.color='white'" onmouseout="this.style.color='rgba(255,255,255,0.4)'" data-astro-cid-xkgdao2y>
← Volver a eventos
</a> <div style="display:inline-flex;align-items:center;gap:8px;background:rgba(124,58,237,0.15);border:1px solid rgba(124,58,237,0.3);color:#c4b5fd;font-size:12px;font-weight:600;padding:6px 14px;border-radius:100px;margin-bottom:16px;display:block;width:fit-content;" data-astro-cid-xkgdao2y>
📅 ${new Date(evento.fecha).toLocaleDateString("es-ES", { weekday: "long", day: "numeric", month: "long", year: "numeric" })} </div> <h1 style="font-size:clamp(32px,6vw,64px);font-weight:900;color:white;letter-spacing:-2px;line-height:1.05;max-width:800px;" class="glow-violet" data-astro-cid-xkgdao2y> ${evento.titulo} </h1> </div> </section> <section style="background:#02020a;padding:40px 0 80px;" data-astro-cid-xkgdao2y> <div style="max-width:1280px;margin:0 auto;padding:0 20px;" class="section-inner" data-astro-cid-xkgdao2y> <div class="evento-grid" data-astro-cid-xkgdao2y> <!-- Columna izquierda --> <div style="display:flex;flex-direction:column;gap:24px;" data-astro-cid-xkgdao2y> <!-- Meta info --> <div class="meta-grid" data-astro-cid-xkgdao2y> ${[
    { icon: "📍", label: "Lugar", value: evento.lugar },
    { icon: "🕐", label: "Hora", value: new Date(evento.fecha).toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" }) },
    { icon: "🎟", label: "Disponibles", value: `${disponibles} de ${evento.capacidad}` },
    { icon: "💰", label: "Precio", value: evento.precio === 0 ? "Gratis" : `S/ ${evento.precio}` }
  ].map((item) => renderTemplate`<div style="background:linear-gradient(145deg,#0a0a18,#080812);border:1px solid rgba(255,255,255,0.05);border-radius:16px;padding:18px 20px;position:relative;overflow:hidden;" data-astro-cid-xkgdao2y> <div style="position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,rgba(124,58,237,0.4),transparent);" data-astro-cid-xkgdao2y></div> <p style="color:rgba(255,255,255,0.3);font-size:11px;text-transform:uppercase;letter-spacing:1px;margin-bottom:6px;" data-astro-cid-xkgdao2y>${item.icon} ${item.label}</p> <p style="color:white;font-weight:700;font-size:15px;" data-astro-cid-xkgdao2y>${item.value}</p> </div>`)} </div> <!-- Barra de ocupación --> <div style="background:linear-gradient(145deg,#0a0a18,#080812);border:1px solid rgba(255,255,255,0.05);border-radius:16px;padding:20px;" data-astro-cid-xkgdao2y> <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;" data-astro-cid-xkgdao2y> <span style="color:rgba(255,255,255,0.4);font-size:13px;" data-astro-cid-xkgdao2y>Ocupación</span> <span style="color:white;font-weight:700;font-size:13px;" data-astro-cid-xkgdao2y>${count ?? 0} / ${evento.capacidad} entradas</span> </div> <div style="height:6px;background:rgba(255,255,255,0.06);border-radius:100px;overflow:hidden;" data-astro-cid-xkgdao2y> <div${addAttribute(`height:100%;border-radius:100px;background:${pct > 80 ? "linear-gradient(90deg,#ef4444,#f97316)" : "linear-gradient(90deg,#7c3aed,#ec4899)"};width:${pct}%;box-shadow:0 0 10px rgba(124,58,237,0.5);transition:width 1s ease;`, "style")} data-astro-cid-xkgdao2y></div> </div> <p style="color:rgba(255,255,255,0.2);font-size:11px;margin-top:8px;" data-astro-cid-xkgdao2y>${pct}% ocupado</p> </div> <!-- Descripción --> <div style="background:linear-gradient(145deg,#0a0a18,#080812);border:1px solid rgba(255,255,255,0.05);border-radius:16px;padding:24px;position:relative;overflow:hidden;" data-astro-cid-xkgdao2y> <div style="position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,rgba(124,58,237,0.4),transparent);" data-astro-cid-xkgdao2y></div> <h2 style="color:white;font-weight:700;font-size:16px;margin-bottom:14px;display:flex;align-items:center;gap:8px;" data-astro-cid-xkgdao2y> <span style="width:3px;height:16px;background:linear-gradient(to bottom,#7c3aed,#ec4899);border-radius:2px;display:inline-block;" data-astro-cid-xkgdao2y></span>
Sobre el evento
</h2> <p style="color:rgba(255,255,255,0.5);font-size:14px;line-height:1.8;white-space:pre-line;" data-astro-cid-xkgdao2y>${evento.descripcion}</p> </div> </div> <!-- Columna derecha: compra --> <div style="position:sticky;top:88px;" data-astro-cid-xkgdao2y> <div style="background:linear-gradient(145deg,#0a0a18,#080812);border:1px solid rgba(124,58,237,0.2);border-radius:20px;overflow:hidden;box-shadow:0 0 40px rgba(124,58,237,0.08);" data-astro-cid-xkgdao2y> <!-- Header precio --> <div style="padding:24px;border-bottom:1px solid rgba(255,255,255,0.05);text-align:center;position:relative;overflow:hidden;" data-astro-cid-xkgdao2y> <div class="holo" style="position:absolute;inset:0;opacity:0.3;" data-astro-cid-xkgdao2y></div> <p style="color:rgba(255,255,255,0.4);font-size:12px;text-transform:uppercase;letter-spacing:2px;margin-bottom:8px;position:relative;" data-astro-cid-xkgdao2y>Precio por entrada</p> <p style="font-size:48px;font-weight:900;position:relative;"${addAttribute(evento.precio === 0 ? "" : "gradient-text", "class")} data-astro-cid-xkgdao2y> ${evento.precio === 0 ? renderTemplate`<span style="color:#4ade80;text-shadow:0 0 20px rgba(74,222,128,0.5);" data-astro-cid-xkgdao2y>Gratis</span>` : `S/ ${evento.precio}`} </p> </div> <div style="padding:24px;" data-astro-cid-xkgdao2y> <!-- Countdown --> ${renderComponent($$result2, "Countdown", Countdown, { "client:load": true, "fecha": evento.fecha, "client:component-hydration": "load", "client:component-path": "C:/Users/Sat/OneDrive - SENATI/Desktop/Web de eventos + sistema de entradas y asistencia/eventos-app/src/components/Countdown", "client:component-export": "default", "data-astro-cid-xkgdao2y": true })} ${disponibles > 0 ? renderTemplate`${renderComponent($$result2, "BuyTicket", BuyTicket, { "client:load": true, "eventoId": evento.id, "eventoTitulo": evento.titulo, "precio": evento.precio, "disponibles": disponibles, "client:component-hydration": "load", "client:component-path": "C:/Users/Sat/OneDrive - SENATI/Desktop/Web de eventos + sistema de entradas y asistencia/eventos-app/src/components/BuyTicket", "client:component-export": "default", "data-astro-cid-xkgdao2y": true })}` : renderTemplate`<div style="text-align:center;padding:24px 0;" data-astro-cid-xkgdao2y> <p style="font-size:40px;margin-bottom:8px;" data-astro-cid-xkgdao2y>😔</p> <p style="color:#f87171;font-weight:700;" data-astro-cid-xkgdao2y>Entradas agotadas</p> </div>`} </div> </div> </div> </div> </div></section> `, "head": async ($$result2) => renderTemplate`${renderComponent($$result2, "Fragment", Fragment$1, { "slot": "head" }, { "default": async ($$result3) => renderTemplate` <meta property="og:type" content="event"> ` })}` })}`;
}, "C:/Users/Sat/OneDrive - SENATI/Desktop/Web de eventos + sistema de entradas y asistencia/eventos-app/src/pages/eventos/[slug].astro", void 0);
const $$file = "C:/Users/Sat/OneDrive - SENATI/Desktop/Web de eventos + sistema de entradas y asistencia/eventos-app/src/pages/eventos/[slug].astro";
const $$url = "/eventos/[slug]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$slug,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
