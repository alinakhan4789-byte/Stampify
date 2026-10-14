import { Lock, User } from 'lucide-react';
import { BRAND } from '../../../config/brand';

export default function AuthHeader() {
  return (
    <header className="fixed top-0 inset-x-0 z-40 bg-surface/80 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      <div className="h-16 max-w-7xl mx-auto px-4 sm:px-12 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-9 h-9 rounded-lg bg-primary-container text-on-primary grid place-items-center shadow-sm"><span className="material-symbols-outlined text-[20px]">verified</span></span>
          <span className="font-display font-extrabold text-xl tracking-tight">{BRAND.name}</span>
          <span className="w-1.5 h-1.5 rounded-full bg-primary mb-2" />
        </div>
        <div className="flex items-center gap-4">
          <nav className="hidden sm:flex items-center gap-4 text-sm">
            <button type="button" className="font-semibold text-on-surface-variant hover:text-on-surface">Help</button>
            <span className="font-bold text-primary">Merchant Portal</span>
          </nav>
          <span className="w-8 h-8 rounded-full bg-primary text-on-primary grid place-items-center"><User size={18} /></span>
        </div>
      </div>
    </header>
  );
}
