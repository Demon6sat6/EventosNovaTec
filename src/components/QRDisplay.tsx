import { useEffect, useRef } from 'react';
import QRCode from 'qrcode';

interface Props {
  codigo: string;
}

export default function QRDisplay({ codigo }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      QRCode.toCanvas(canvasRef.current, codigo, { width: 220, margin: 2 });
    }
  }, [codigo]);

  return <canvas ref={canvasRef} className="rounded-lg" />;
}
