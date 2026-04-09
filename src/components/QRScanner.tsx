import { useEffect, useRef, useState } from 'react';

type ScanResult = {
  ok: boolean;
  error?: string;
  entrada?: {
    nombre: string;
    cantidad: number;
    estado: string;
    evento?: { titulo: string };
  };
};

type HistorialItem = {
  ok: boolean;
  mensaje: string;
  hora: string;
};

export default function QRScanner() {
  const scannerRef = useRef<any>(null);
  const [activo, setActivo] = useState(false);
  const [resultado, setResultado] = useState<ScanResult | null>(null);
  const [procesando, setProcesando] = useState(false);
  const [historial, setHistorial] = useState<HistorialItem[]>([]);
  const ultimoCodigo = useRef<string>('');
  const cooldown = useRef(false);

  async function validar(codigo: string) {
    if (cooldown.current || procesando) return;
    if (codigo === ultimoCodigo.current) return;

    ultimoCodigo.current = codigo;
    cooldown.current = true;
    setProcesando(true);

    try {
      const res = await fetch('/api/checkin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ codigo }),
      });
      const data: ScanResult = await res.json();
      setResultado(data);

      const hora = new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
      const mensaje = data.ok
        ? `✅ ${data.entrada?.nombre} — ${data.entrada?.evento?.titulo}`
        : `❌ ${data.error}${data.entrada ? ` (${data.entrada.nombre})` : ''}`;

      setHistorial(prev => [{ ok: data.ok, mensaje, hora }, ...prev.slice(0, 9)]);
    } catch {
      setResultado({ ok: false, error: 'Error de conexión' });
    } finally {
      setProcesando(false);
      // Cooldown de 3s para no re-escanear el mismo QR
      setTimeout(() => {
        cooldown.current = false;
        ultimoCodigo.current = '';
        setResultado(null);
      }, 3000);
    }
  }

  async function iniciarScanner() {
    const { Html5Qrcode } = await import('html5-qrcode');
    const scanner = new Html5Qrcode('qr-reader');
    scannerRef.current = scanner;

    try {
      await scanner.start(
        { facingMode: 'environment' },
        { fps: 10, qrbox: { width: 250, height: 250 } },
        (decodedText: string) => { validar(decodedText); },
        undefined
      );
      setActivo(true);
    } catch (err) {
      console.error(err);
      alert('No se pudo acceder a la cámara. Verifica los permisos.');
    }
  }

  async function detenerScanner() {
    if (scannerRef.current) {
      await scannerRef.current.stop();
      scannerRef.current = null;
    }
    setActivo(false);
    setResultado(null);
    ultimoCodigo.current = '';
  }

  useEffect(() => {
    return () => { detenerScanner(); };
  }, []);

  return (
    <div className="space-y-6">
      {/* Visor de cámara */}
      <div className="bg-[#0f0f1a] border border-white/5 rounded-2xl overflow-hidden">
        <div className="relative">
          {/* Contenedor del scanner */}
          <div id="qr-reader" className={`w-full ${activo ? 'block' : 'hidden'}`}
            style={{ minHeight: '300px' }} />

          {/* Placeholder cuando no está activo */}
          {!activo && (
            <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
              <div className="w-24 h-24 border-2 border-dashed border-white/20 rounded-2xl flex items-center justify-center mb-4">
                <span className="text-4xl opacity-40">📷</span>
              </div>
              <p className="text-white/40 text-sm mb-6">La cámara está apagada</p>
              <button
                onClick={iniciarScanner}
                className="bg-gradient-to-r from-violet-600 to-pink-600 hover:from-violet-500 hover:to-pink-500 text-white font-bold px-8 py-3 rounded-xl transition-all shadow-lg shadow-violet-500/20 text-sm"
              >
                📷 Activar cámara
              </button>
            </div>
          )}

          {/* Overlay de resultado sobre la cámara */}
          {activo && resultado && (
            <div className={`absolute inset-0 flex items-center justify-center ${resultado.ok ? 'bg-green-500/80' : 'bg-red-500/80'} backdrop-blur-sm transition-all`}>
              <div className="text-center text-white p-6">
                <p className="text-6xl mb-3">{resultado.ok ? '✅' : '❌'}</p>
                {resultado.ok ? (
                  <>
                    <p className="text-xl font-black">Entrada válida</p>
                    <p className="text-sm opacity-80 mt-1">{resultado.entrada?.nombre}</p>
                    <p className="text-xs opacity-60 mt-0.5">{resultado.entrada?.evento?.titulo}</p>
                    <p className="text-xs opacity-60">{resultado.entrada?.cantidad} entrada(s)</p>
                  </>
                ) : (
                  <>
                    <p className="text-xl font-black">Entrada inválida</p>
                    <p className="text-sm opacity-80 mt-1">{resultado.error}</p>
                    {resultado.entrada && <p className="text-xs opacity-60 mt-0.5">{resultado.entrada.nombre}</p>}
                  </>
                )}
              </div>
            </div>
          )}

          {/* Indicador procesando */}
          {activo && procesando && !resultado && (
            <div className="absolute top-3 right-3 bg-black/60 text-white text-xs px-3 py-1.5 rounded-full">
              ⏳ Verificando...
            </div>
          )}
        </div>

        {/* Botón detener */}
        {activo && (
          <div className="px-5 py-3 border-t border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              <span className="text-white/50 text-xs">Cámara activa — apunta al código QR</span>
            </div>
            <button
              onClick={detenerScanner}
              className="text-red-400 hover:text-red-300 text-xs font-semibold transition"
            >
              Detener
            </button>
          </div>
        )}
      </div>

      {/* Historial */}
      {historial.length > 0 && (
        <div>
          <h3 className="text-white/40 text-xs font-semibold uppercase tracking-wider mb-3">
            Últimas validaciones
          </h3>
          <div className="space-y-2">
            {historial.map((item, i) => (
              <div key={i}
                className={`flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm border ${
                  item.ok
                    ? 'bg-green-500/5 border-green-500/20'
                    : 'bg-red-500/5 border-red-500/20'
                }`}>
                <div className="flex-1 min-w-0">
                  <p className={`text-xs truncate ${item.ok ? 'text-green-300' : 'text-red-300'}`}>
                    {item.mensaje}
                  </p>
                </div>
                <span className="text-white/20 text-xs shrink-0">{item.hora}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
