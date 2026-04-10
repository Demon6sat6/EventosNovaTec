import { useState } from 'react';

interface Props {
  eventoId: string;
  eventoTitulo: string;
  precio: number;
  disponibles: number;
}

export default function BuyTicket({ eventoId, eventoTitulo, precio, disponibles }: Props) {
  const [nombre,   setNombre]   = useState('');
  const [email,    setEmail]    = useState('');
  const [cantidad, setCantidad] = useState(1);
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState('');

  const total = precio * cantidad;

  const inputStyle: React.CSSProperties = {
    width: '100%', background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.1)', color: 'white',
    borderRadius: '12px', padding: '13px 16px', fontSize: '14px',
    outline: 'none', fontFamily: 'inherit',
    transition: 'border-color 0.2s, background 0.2s', boxSizing: 'border-box',
  };
  const labelStyle: React.CSSProperties = {
    display: 'block', color: 'rgba(255,255,255,0.5)', fontSize: '11px',
    fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px',
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true); setError('');
    try {
      const res = await fetch('/api/comprar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ eventoId, nombre, email, cantidad }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Error al procesar');

      const totalTexto = precio === 0 ? 'GRATIS' : `S/ ${(precio * cantidad).toFixed(2)}`;
      const msg = encodeURIComponent(
        `🎟 *Nueva reserva - EventosApp*\n\n` +
        `*Evento:* ${eventoTitulo}\n*Asistente:* ${nombre}\n*Email:* ${email}\n` +
        `*Cantidad:* ${cantidad} entrada${cantidad > 1 ? 's' : ''}\n*Total:* ${totalTexto}\n` +
        `*ID Reserva:* ${data.entradaId}\n\n_Una vez confirmado el pago, recibirás tu código QR._`
      );
      window.open(`https://wa.me/51993034435?text=${msg}`, '_blank');
      window.location.href = `/entrada/${data.entradaId}`;
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '20px' }}>

        {/* Nombre */}
        <div>
          <label htmlFor="bt-nombre" style={labelStyle}>Nombre completo</label>
          <div style={{ position: 'relative' }}>
            <svg aria-hidden="true" focusable="false"
              style={{ position:'absolute', left:'14px', top:'50%', transform:'translateY(-50%)', opacity:0.3 }}
              width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
            </svg>
            <input id="bt-nombre" type="text" required autoComplete="name"
              value={nombre} onChange={e => setNombre(e.target.value)}
              placeholder="Tu nombre completo"
              aria-required="true"
              style={{ ...inputStyle, paddingLeft: '42px' }}
              onFocus={e => { e.target.style.borderColor='rgba(124,58,237,0.6)'; e.target.style.background='rgba(124,58,237,0.05)'; }}
              onBlur={e  => { e.target.style.borderColor='rgba(255,255,255,0.1)'; e.target.style.background='rgba(255,255,255,0.04)'; }}
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label htmlFor="bt-email" style={labelStyle}>Correo electrónico</label>
          <div style={{ position: 'relative' }}>
            <svg aria-hidden="true" focusable="false"
              style={{ position:'absolute', left:'14px', top:'50%', transform:'translateY(-50%)', opacity:0.3 }}
              width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
            </svg>
            <input id="bt-email" type="email" required autoComplete="email"
              value={email} onChange={e => setEmail(e.target.value)}
              placeholder="tu@email.com"
              aria-required="true"
              style={{ ...inputStyle, paddingLeft: '42px' }}
              onFocus={e => { e.target.style.borderColor='rgba(124,58,237,0.6)'; e.target.style.background='rgba(124,58,237,0.05)'; }}
              onBlur={e  => { e.target.style.borderColor='rgba(255,255,255,0.1)'; e.target.style.background='rgba(255,255,255,0.04)'; }}
            />
          </div>
        </div>

        {/* Cantidad */}
        <div>
          <label htmlFor="bt-cantidad" style={labelStyle}>Cantidad de entradas</label>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <button type="button" aria-label="Reducir cantidad"
              onClick={() => setCantidad(c => Math.max(1, c - 1))}
              style={{ width:'42px', height:'42px', background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.1)', color:'white', borderRadius:'10px', fontSize:'20px', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, transition:'all 0.2s' }}
              onMouseOver={e => (e.currentTarget.style.background='rgba(124,58,237,0.15)')}
              onMouseOut={e  => (e.currentTarget.style.background='rgba(255,255,255,0.05)')}>
              −
            </button>
            <div id="bt-cantidad" role="status" aria-live="polite"
              style={{ flex:1, background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.1)', borderRadius:'10px', padding:'10px 16px', textAlign:'center', fontSize:'16px', fontWeight:700, color:'white' }}>
              {cantidad} {cantidad === 1 ? 'entrada' : 'entradas'}
            </div>
            <button type="button" aria-label="Aumentar cantidad"
              onClick={() => setCantidad(c => Math.min(disponibles, c + 1))}
              style={{ width:'42px', height:'42px', background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.1)', color:'white', borderRadius:'10px', fontSize:'20px', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, transition:'all 0.2s' }}
              onMouseOver={e => (e.currentTarget.style.background='rgba(124,58,237,0.15)')}
              onMouseOut={e  => (e.currentTarget.style.background='rgba(255,255,255,0.05)')}>
              +
            </button>
          </div>
          <p style={{ color:'rgba(255,255,255,0.3)', fontSize:'11px', marginTop:'6px' }}>
            Máximo {disponibles} disponibles
          </p>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div role="alert" style={{ background:'rgba(239,68,68,0.1)', border:'1px solid rgba(239,68,68,0.25)', color:'#f87171', fontSize:'13px', padding:'12px 14px', borderRadius:'10px', marginBottom:'16px', display:'flex', alignItems:'center', gap:'8px' }}>
          <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          {error}
        </div>
      )}

      {/* Resumen */}
      <div aria-label={`Total: ${precio === 0 ? 'Gratis' : `S/ ${total.toFixed(2)}`}`}
        style={{ background:'rgba(124,58,237,0.06)', border:'1px solid rgba(124,58,237,0.15)', borderRadius:'14px', padding:'16px', marginBottom:'16px' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          <span style={{ color:'rgba(255,255,255,0.5)', fontSize:'13px' }}>
            {cantidad} × {precio === 0 ? 'Gratis' : `S/ ${precio}`}
          </span>
          <span style={{ color:'white', fontWeight:800, fontSize:'20px', background:'linear-gradient(135deg,#a78bfa,#f472b6)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>
            {precio === 0 ? 'GRATIS' : `S/ ${total.toFixed(2)}`}
          </span>
        </div>
      </div>

      {/* Botón */}
      <button type="submit" disabled={loading}
        aria-busy={loading}
        style={{
          width:'100%', background: loading ? 'rgba(124,58,237,0.4)' : 'linear-gradient(135deg,#7c3aed,#ec4899)',
          color:'white', fontWeight:700, fontSize:'15px', padding:'15px', borderRadius:'14px',
          border:'none', cursor: loading ? 'not-allowed' : 'pointer', fontFamily:'inherit',
          letterSpacing:'0.5px', boxShadow: loading ? 'none' : '0 8px 32px rgba(124,58,237,0.4)',
          transition:'all 0.2s', display:'flex', alignItems:'center', justifyContent:'center', gap:'10px',
        }}
        onMouseOver={e => { if (!loading) e.currentTarget.style.transform='translateY(-2px)'; }}
        onMouseOut={e  => { e.currentTarget.style.transform='translateY(0)'; }}>
        {loading ? (
          <>
            <svg aria-hidden="true" style={{ animation:'spin 1s linear infinite' }} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
            </svg>
            Procesando...
          </>
        ) : precio === 0 ? (
          <>
            <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 12V22H4V12"/><path d="M22 7H2v5h20V7z"/><path d="M12 22V7"/><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/></svg>
            Reservar gratis
          </>
        ) : (
          <>
            <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
            Comprar entrada
          </>
        )}
      </button>

      <p style={{ color:'rgba(255,255,255,0.25)', fontSize:'11px', textAlign:'center', marginTop:'12px', display:'flex', alignItems:'center', justifyContent:'center', gap:'5px' }}>
        <svg aria-hidden="true" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
        Pago 100% seguro
      </p>

      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </form>
  );
}
