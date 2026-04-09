import { useState } from 'react';

interface Props {
  eventoId: string;
  eventoTitulo: string;
  precio: number;
  disponibles: number;
}

export default function BuyTicket({ eventoId, precio, disponibles }: Props) {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [cantidad, setCantidad] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const total = precio * cantidad;

  const inputClass = "w-full bg-white/5 border border-white/10 text-white placeholder-white/30 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-violet-500/60 focus:bg-white/8 transition";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/comprar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ eventoId, nombre, email, cantidad }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Error al procesar');
      if (precio === 0) {
        window.location.href = `/entrada/${data.entradaId}`;
      } else {
        window.location.href = data.checkoutUrl;
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <label className="block text-white/50 text-xs mb-1.5">Nombre completo</label>
        <input
          type="text" required value={nombre}
          onChange={e => setNombre(e.target.value)}
          className={inputClass} placeholder="Tu nombre"
        />
      </div>
      <div>
        <label className="block text-white/50 text-xs mb-1.5">Email</label>
        <input
          type="email" required value={email}
          onChange={e => setEmail(e.target.value)}
          className={inputClass} placeholder="tu@email.com"
        />
      </div>
      <div>
        <label className="block text-white/50 text-xs mb-1.5">Cantidad</label>
        <select
          value={cantidad}
          onChange={e => setCantidad(Number(e.target.value))}
          className={inputClass}
          style={{ colorScheme: 'dark' }}
        >
          {Array.from({ length: Math.min(10, disponibles) }, (_, i) => i + 1).map(n => (
            <option key={n} value={n}>{n} entrada{n > 1 ? 's' : ''}</option>
          ))}
        </select>
      </div>

      {error && (
        <p className="text-red-400 text-xs bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">{error}</p>
      )}

      {precio > 0 && (
        <div className="flex justify-between text-sm py-2 border-t border-white/10">
          <span className="text-white/40">Total</span>
          <span className="text-white font-bold">S/ {total.toFixed(2)}</span>
        </div>
      )}

      <button
        type="submit" disabled={loading}
        className="w-full bg-gradient-to-r from-violet-600 to-pink-600 hover:from-violet-500 hover:to-pink-500 disabled:opacity-50 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-violet-500/20 text-sm mt-2"
      >
        {loading ? '⏳ Procesando...' : precio === 0 ? '🎟 Reservar gratis' : '💳 Comprar entrada'}
      </button>
    </form>
  );
}
