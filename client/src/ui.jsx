import { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';
const Ctx = createContext(() => {});
export const useToast = () => useContext(Ctx);
export function ToastProvider({ children }) {
  const [items, setItems] = useState([]);
  const push = useCallback((msg, type = 'ok') => {
    const id = Math.random();
    setItems((i) => [...i, { id, msg, type }]);
    setTimeout(() => setItems((i) => i.filter((x) => x.id !== id)), 3500);
  }, []);
  return (
    <Ctx.Provider value={push}>{children}
      <div className="fixed top-4 inset-x-4 sm:left-auto sm:right-4 z-50 space-y-2" role="status" aria-live="polite">
        {items.map((t) => (
          <div key={t.id} className={`rise flex items-center gap-2 px-4 py-3 rounded-lg shadow-lg text-sm text-white ${t.type === 'err' ? 'bg-rose-700' : 'bg-ink'}`}>
            {t.type === 'err' ? <XCircle size={18} /> : <CheckCircle2 size={18} />}{t.msg}</div>))}
      </div>
    </Ctx.Provider>
  );
}
export const Skeleton = ({ className = 'h-40' }) => <div className={`rounded-2xl bg-slate-200 animate-pulse ${className}`} />;
