import { useEffect, useRef } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';

export default function QrScanner({ onScan }) {
  const cb = useRef(onScan); cb.current = onScan;      // always call the latest handler
  useEffect(() => {
    const s = new Html5QrcodeScanner('qr-reader', { fps: 10, qrbox: 220 }, false);
    s.render((text) => cb.current(text), () => {});
    return () => { s.clear().catch(() => {}); };
  }, []);
  return <div id="qr-reader" />;
}
