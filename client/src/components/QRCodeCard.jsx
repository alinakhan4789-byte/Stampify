import { QRCodeSVG } from 'qrcode.react';

// The QR holds a small JSON payload that the business scanner reads.
export default function QRCodeCard({ user }) {
  const payload = JSON.stringify({ type: 'stampify-customer', email: user.email });
  return (
    <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/40 shadow-sm p-6 text-center max-w-sm mx-auto">
      <QRCodeSVG value={payload} size={220} level="M" includeMargin className="mx-auto" />
      <p className="font-bold mt-3">{user.name}</p><p className="text-sm text-on-surface-variant">{user.email}</p>
      <p className="text-xs text-on-surface-variant mt-3">Show this code to a participating business to collect a stamp.</p>
    </div>
  );
}
