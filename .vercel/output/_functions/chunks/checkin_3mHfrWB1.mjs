import { c as createComponent } from './astro-component_CnPl_Uqv.mjs';
import 'piccolore';
import { T as renderTemplate, B as maybeRenderHead } from './sequence_jkwZ4rKh.mjs';
import { r as renderComponent } from './entrypoint_D5PyMbLA.mjs';
import { $ as $$AdminLayout } from './AdminLayout_Cf2CqdKK.mjs';
import { jsxs, jsx, Fragment } from 'react/jsx-runtime';
import { useRef, useState, useEffect } from 'react';

function QRScanner() {
  const scannerRef = useRef(null);
  const [activo, setActivo] = useState(false);
  const [resultado, setResultado] = useState(null);
  const [procesando, setProcesando] = useState(false);
  const [historial, setHistorial] = useState([]);
  const ultimoCodigo = useRef("");
  const cooldown = useRef(false);
  async function validar(codigo) {
    if (cooldown.current || procesando) return;
    if (codigo === ultimoCodigo.current) return;
    ultimoCodigo.current = codigo;
    cooldown.current = true;
    setProcesando(true);
    try {
      const res = await fetch("/api/checkin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ codigo })
      });
      const data = await res.json();
      setResultado(data);
      const hora = (/* @__PURE__ */ new Date()).toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" });
      const mensaje = data.ok ? `✅ ${data.entrada?.nombre} — ${data.entrada?.evento?.titulo}` : `❌ ${data.error}${data.entrada ? ` (${data.entrada.nombre})` : ""}`;
      setHistorial((prev) => [{ ok: data.ok, mensaje, hora }, ...prev.slice(0, 9)]);
    } catch {
      setResultado({ ok: false, error: "Error de conexión" });
    } finally {
      setProcesando(false);
      setTimeout(() => {
        cooldown.current = false;
        ultimoCodigo.current = "";
        setResultado(null);
      }, 3e3);
    }
  }
  async function iniciarScanner() {
    const { Html5Qrcode } = await import('html5-qrcode');
    const scanner = new Html5Qrcode("qr-reader");
    scannerRef.current = scanner;
    try {
      await scanner.start(
        { facingMode: "environment" },
        { fps: 10, qrbox: { width: 250, height: 250 } },
        (decodedText) => {
          validar(decodedText);
        },
        void 0
      );
      setActivo(true);
    } catch (err) {
      console.error(err);
      alert("No se pudo acceder a la cámara. Verifica los permisos.");
    }
  }
  async function detenerScanner() {
    if (scannerRef.current) {
      await scannerRef.current.stop();
      scannerRef.current = null;
    }
    setActivo(false);
    setResultado(null);
    ultimoCodigo.current = "";
  }
  useEffect(() => {
    return () => {
      detenerScanner();
    };
  }, []);
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "bg-[#0f0f1a] border border-white/5 rounded-2xl overflow-hidden", children: [
      /* @__PURE__ */ jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsx(
          "div",
          {
            id: "qr-reader",
            className: `w-full ${activo ? "block" : "hidden"}`,
            style: { minHeight: "300px" }
          }
        ),
        !activo && /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center py-16 px-6 text-center", children: [
          /* @__PURE__ */ jsx("div", { className: "w-24 h-24 border-2 border-dashed border-white/20 rounded-2xl flex items-center justify-center mb-4", children: /* @__PURE__ */ jsx("span", { className: "text-4xl opacity-40", children: "📷" }) }),
          /* @__PURE__ */ jsx("p", { className: "text-white/40 text-sm mb-6", children: "La cámara está apagada" }),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: iniciarScanner,
              className: "bg-gradient-to-r from-violet-600 to-pink-600 hover:from-violet-500 hover:to-pink-500 text-white font-bold px-8 py-3 rounded-xl transition-all shadow-lg shadow-violet-500/20 text-sm",
              children: "📷 Activar cámara"
            }
          )
        ] }),
        activo && resultado && /* @__PURE__ */ jsx("div", { className: `absolute inset-0 flex items-center justify-center ${resultado.ok ? "bg-green-500/80" : "bg-red-500/80"} backdrop-blur-sm transition-all`, children: /* @__PURE__ */ jsxs("div", { className: "text-center text-white p-6", children: [
          /* @__PURE__ */ jsx("p", { className: "text-6xl mb-3", children: resultado.ok ? "✅" : "❌" }),
          resultado.ok ? /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx("p", { className: "text-xl font-black", children: "Entrada válida" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm opacity-80 mt-1", children: resultado.entrada?.nombre }),
            /* @__PURE__ */ jsx("p", { className: "text-xs opacity-60 mt-0.5", children: resultado.entrada?.evento?.titulo }),
            /* @__PURE__ */ jsxs("p", { className: "text-xs opacity-60", children: [
              resultado.entrada?.cantidad,
              " entrada(s)"
            ] })
          ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx("p", { className: "text-xl font-black", children: "Entrada inválida" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm opacity-80 mt-1", children: resultado.error }),
            resultado.entrada && /* @__PURE__ */ jsx("p", { className: "text-xs opacity-60 mt-0.5", children: resultado.entrada.nombre })
          ] })
        ] }) }),
        activo && procesando && !resultado && /* @__PURE__ */ jsx("div", { className: "absolute top-3 right-3 bg-black/60 text-white text-xs px-3 py-1.5 rounded-full", children: "⏳ Verificando..." })
      ] }),
      activo && /* @__PURE__ */ jsxs("div", { className: "px-5 py-3 border-t border-white/5 flex items-center justify-between", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx("span", { className: "w-2 h-2 bg-green-400 rounded-full animate-pulse" }),
          /* @__PURE__ */ jsx("span", { className: "text-white/50 text-xs", children: "Cámara activa — apunta al código QR" })
        ] }),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: detenerScanner,
            className: "text-red-400 hover:text-red-300 text-xs font-semibold transition",
            children: "Detener"
          }
        )
      ] })
    ] }),
    historial.length > 0 && /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("h3", { className: "text-white/40 text-xs font-semibold uppercase tracking-wider mb-3", children: "Últimas validaciones" }),
      /* @__PURE__ */ jsx("div", { className: "space-y-2", children: historial.map((item, i) => /* @__PURE__ */ jsxs(
        "div",
        {
          className: `flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm border ${item.ok ? "bg-green-500/5 border-green-500/20" : "bg-red-500/5 border-red-500/20"}`,
          children: [
            /* @__PURE__ */ jsx("div", { className: "flex-1 min-w-0", children: /* @__PURE__ */ jsx("p", { className: `text-xs truncate ${item.ok ? "text-green-300" : "text-red-300"}`, children: item.mensaje }) }),
            /* @__PURE__ */ jsx("span", { className: "text-white/20 text-xs shrink-0", children: item.hora })
          ]
        },
        i
      )) })
    ] })
  ] });
}

const $$Checkin = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "Check-in QR" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="max-w-lg"> <p class="text-white/40 text-sm mb-6">
Activa la cámara y apunta al código QR de la entrada del asistente para validarla automáticamente.
</p> ${renderComponent($$result2, "QRScanner", QRScanner, { "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/Sat/OneDrive - SENATI/Desktop/Web de eventos + sistema de entradas y asistencia/eventos-app/src/components/QRScanner", "client:component-export": "default" })} </div> ` })}`;
}, "C:/Users/Sat/OneDrive - SENATI/Desktop/Web de eventos + sistema de entradas y asistencia/eventos-app/src/pages/admin/checkin.astro", void 0);

const $$file = "C:/Users/Sat/OneDrive - SENATI/Desktop/Web de eventos + sistema de entradas y asistencia/eventos-app/src/pages/admin/checkin.astro";
const $$url = "/admin/checkin";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Checkin,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
