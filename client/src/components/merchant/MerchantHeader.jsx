import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function MerchantHeader() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  return (
    <header className="fixed top-0 left-72 right-0 z-40 bg-surface/80 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      <div className="h-16 px-6 flex items-center justify-between gap-4">
        <span className="flex items-center gap-2 bg-surface-container-lowest px-4 py-1.5 rounded-full shadow-sm">
          <span className="material-symbols-outlined text-primary text-[20px]">storefront</span>
          <span className="text-sm font-semibold">{user.businessName || user.name}</span>
        </span>
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/business/scan')} className="flex items-center gap-1.5 bg-primary text-on-primary px-4 py-1.5 rounded-lg text-sm font-semibold shadow-sm hover:bg-primary-container"><span className="material-symbols-outlined text-[18px]">qr_code_scanner</span>Quick Scan POS</button>
          <button onClick={logout} title="Log out" className="w-8 h-8 rounded-full bg-primary grid place-items-center"><span className="material-symbols-outlined text-on-primary text-[18px]">person</span></button>
        </div>
      </div>
    </header>
  );
}
