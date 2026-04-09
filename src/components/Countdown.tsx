import { useEffect, useState } from 'react';

interface Props { fecha: string; }

export default function Countdown({ fecha }: Props) {
  const [tiempo, setTiempo] = useState({ dias:0, horas:0, minutos:0, segundos:0, pasado:false });

  useEffect(() => {
    const calcular = () => {
      const diff = new Date(fecha).getTime() - Date.now();
      if (diff <= 0) { setTiempo(t => ({ ...t, pasado: true })); return; }
      setTiempo({
        dias:     Math.floor(diff / 86400000),
        horas:    Math.floor((diff % 86400000) / 3600000),
        minutos:  Math.floor((diff % 3600000) / 60000),
        segundos: Math.floor((diff % 60000) / 1000),
        pasado:   false,
      });
    };
    calcular();
    const id = setInterval(calcular, 1000);
    return () => clearInterval(id);
  }, [fecha]);

  if (tiempo.pasado) return (
    <div style={{ textAlign:'center', padding:'16px', background:'rgba(34,197,94,0.08)', border:'1px solid rgba(34,197,94,0.2)', borderRadius:'14px' }}>
      <p style={{ color:'#4ade80', fontWeight:700, fontSize:'14px' }}>El evento ya comenzó</p>
    </div>
  );

  const bloques = [
    { val: tiempo.dias,     label: 'Días'     },
    { val: tiempo.horas,    label: 'Horas'    },
    { val: tiempo.minutos,  label: 'Minutos'  },
    { val: tiempo.segundos, label: 'Segundos' },
  ];

  return (
    <div style={{ marginBottom:'20px' }}>
      <p style={{ color:'rgba(255,255,255,0.3)', fontSize:'11px', textTransform:'uppercase', letterSpacing:'1.5px', marginBottom:'10px', textAlign:'center' }}>
        Faltan
      </p>
      <div className="countdown-grid">
        {bloques.map(b => (
          <div key={b.label} style={{ background:'rgba(124,58,237,0.08)', border:'1px solid rgba(124,58,237,0.15)', borderRadius:'12px', padding:'12px 8px', textAlign:'center' }}>
            <p style={{ color:'white', fontWeight:900, fontSize:'24px', lineHeight:1, marginBottom:'4px', fontVariantNumeric:'tabular-nums' }}>
              {String(b.val).padStart(2,'0')}
            </p>
            <p style={{ color:'rgba(255,255,255,0.25)', fontSize:'10px', textTransform:'uppercase', letterSpacing:'1px' }}>{b.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
