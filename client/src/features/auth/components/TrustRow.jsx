import { ShieldCheck, Smartphone, LifeBuoy } from 'lucide-react';

export default function TrustRow() {
  return (
    <div className="w-full mt-6 flex flex-col sm:flex-row items-center justify-between gap-3 px-1 text-on-surface-variant">
      <span className="flex items-center gap-1 label-caps"><ShieldCheck size={18} className="text-primary" />Bank-grade 256-bit encryption</span>
      <span className="flex items-center gap-1 text-xs font-semibold"><Smartphone size={18} className="text-on-surface" />Apple &amp; Google Wallet ready</span>
      <button type="button" className="flex items-center gap-1 text-xs font-semibold text-primary hover:underline"><LifeBuoy size={16} />Merchant Support Desk</button>
    </div>
  );
}
