import { Resend } from 'resend';
import QRCode from 'qrcode';

const resend = new Resend(import.meta.env.RESEND_API_KEY);
const SITE_URL = import.meta.env.PUBLIC_SITE_URL ?? 'http://localhost:4321';

export async function enviarEmailEntrada(entrada: {
  id: string;
  nombre: string;
  email: string;
  cantidad: number;
  total: number;
  codigo_qr: string;
  evento: { titulo: string; fecha: string; lugar: string };
}) {
  // Generar QR como imagen base64
  const qrDataUrl = await QRCode.toDataURL(entrada.codigo_qr, { width: 200, margin: 2 });

  const fechaFormateada = new Date(entrada.evento.fecha).toLocaleString('es-ES', {
    dateStyle: 'full', timeStyle: 'short'
  });

  await resend.emails.send({
    from: 'EventosApp <noreply@eventosapp.com>',
    to: entrada.email,
    subject: `Tu entrada para ${entrada.evento.titulo}`,
    html: `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"/></head>
<body style="margin:0;padding:0;background:#02020a;font-family:'Inter',sans-serif;">
  <div style="max-width:520px;margin:0 auto;padding:32px 16px;">

    <!-- Header -->
    <div style="background:linear-gradient(135deg,#7c3aed,#ec4899);border-radius:16px 16px 0 0;padding:28px 32px;text-align:center;">
      <p style="color:rgba(255,255,255,0.7);font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:2px;margin:0 0 8px;">Tu entrada para</p>
      <h1 style="color:white;font-size:24px;font-weight:900;margin:0;">${entrada.evento.titulo}</h1>
    </div>

    <!-- Body -->
    <div style="background:#0f0f1a;border:1px solid rgba(255,255,255,0.08);border-top:none;border-radius:0 0 16px 16px;padding:28px 32px;">

      <!-- Info -->
      <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
        ${[
          ['Asistente', entrada.nombre],
          ['Fecha', fechaFormateada],
          ['Lugar', entrada.evento.lugar],
          ['Cantidad', `${entrada.cantidad} entrada${entrada.cantidad > 1 ? 's' : ''}`],
          ['Total', entrada.total === 0 ? 'Gratis' : `S/ ${entrada.total.toFixed(2)}`],
        ].map(([label, value]) => `
          <tr>
            <td style="padding:8px 0;color:rgba(255,255,255,0.35);font-size:13px;border-bottom:1px solid rgba(255,255,255,0.05);">${label}</td>
            <td style="padding:8px 0;color:white;font-size:13px;font-weight:600;text-align:right;border-bottom:1px solid rgba(255,255,255,0.05);">${value}</td>
          </tr>
        `).join('')}
      </table>

      <!-- QR -->
      <div style="text-align:center;margin-bottom:24px;">
        <p style="color:rgba(255,255,255,0.4);font-size:12px;text-transform:uppercase;letter-spacing:1px;margin-bottom:16px;">Presenta este código en la entrada</p>
        <div style="background:white;display:inline-block;padding:12px;border-radius:12px;">
          <img src="${qrDataUrl}" width="180" height="180" alt="QR Code" style="display:block;"/>
        </div>
        <p style="color:rgba(255,255,255,0.2);font-size:11px;font-family:monospace;margin-top:8px;">${entrada.codigo_qr}</p>
      </div>

      <!-- CTA -->
      <div style="text-align:center;">
        <a href="${SITE_URL}/entrada/${entrada.id}"
          style="display:inline-block;background:linear-gradient(135deg,#7c3aed,#ec4899);color:white;font-weight:700;font-size:14px;padding:13px 32px;border-radius:100px;text-decoration:none;">
          Ver mi entrada online
        </a>
      </div>

      <p style="color:rgba(255,255,255,0.15);font-size:11px;text-align:center;margin-top:24px;">
        Guarda este email o toma una captura del QR
      </p>
    </div>
  </div>
</body>
</html>`,
  });
}
