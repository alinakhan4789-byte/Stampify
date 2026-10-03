import { useAuth } from '../../context/AuthContext';

export default function CustomerFooter() {
  const { logout } = useAuth();
  return (
<footer className="w-full bg-surface-container-lowest mt-space-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]"><div className="max-w-7xl mx-auto px-margin-lg py-space-lg flex flex-col md:flex-row items-center justify-between gap-space-md"><div className="flex items-center gap-space-sm"><span className="w-6 h-6 rounded-lg bg-primary-container text-on-primary grid place-items-center shrink-0"><span className="material-symbols-outlined text-[14px]">verified</span></span><span className="font-title-md text-title-md text-on-surface">Stampify</span><span className="text-on-surface-variant font-body-sm text-body-sm ml-space-xs">© 2025 Stampify Pass Inc. Apple Wallet &amp; Google Wallet compatible.</span></div><div className="flex items-center gap-space-lg"><a className="font-label-md text-label-md text-on-surface-variant hover:text-on-surface transition-colors" href="/register?role=business">Merchant Solutions</a><a className="font-label-md text-label-md text-on-surface-variant hover:text-on-surface transition-colors" href="#">Privacy Policy</a><a className="font-label-md text-label-md text-on-surface-variant hover:text-on-surface transition-colors" href="#">Terms of Service</a><a className="font-label-md text-label-md text-on-surface-variant hover:text-on-surface transition-colors" href="#">Contact Support</a></div></div></footer>
  );
}
