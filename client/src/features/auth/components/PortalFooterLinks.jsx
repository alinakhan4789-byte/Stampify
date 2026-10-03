import { Link } from 'react-router-dom';
import { Hash } from 'lucide-react';
import { useToast } from '../../../ui';

// Grey band pinned to the bottom edge of the login card.
export default function PortalFooterLinks({ portal, onSwitch }) {
  const toast = useToast();
  const link = 'text-xs font-semibold flex items-center gap-1';
  return (
    <div className="-mx-4 sm:-mx-8 -mb-4 sm:-mb-8 mt-6 p-4 sm:px-8 bg-surface-container-low/60 flex flex-col sm:flex-row items-center justify-between gap-2">
      {portal === 'merchant'
        ? <button type="button" onClick={() => toast('PIN login is not available yet', 'err')} className={`${link} text-primary font-bold hover:underline`}><Hash size={16} />Cashier fast-pass PIN login →</button>
        : <button type="button" onClick={() => onSwitch('merchant')} className={`${link} text-primary font-bold hover:underline`}>Store owner? Switch to Merchant login →</button>}
      <Link to="/register" className={`${link} text-secondary hover:text-on-surface`}>
        {portal === 'merchant' ? 'New business? Register your store' : 'New here? Create an account'}<span className="text-primary font-bold">→</span>
      </Link>
    </div>
  );
}
