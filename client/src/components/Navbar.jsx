import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { dashboardPath } from '../utils/helpers';

export default function Navbar() {
  const { user } = useAuth();
  return (
    <header className="sticky top-0 z-40 bg-surface/80 backdrop-blur-xl border-b border-outline-variant/30">
      <div className="max-w-6xl mx-auto h-16 px-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-display font-extrabold text-xl"><span className="w-9 h-9 rounded-lg bg-primary-container text-on-primary grid place-items-center"><span className="material-symbols-outlined text-[20px]">verified</span></span>Stampify</Link>
        <nav className="flex items-center gap-2 sm:gap-4 text-sm font-semibold">
          <a href="#how" className="hidden sm:inline text-on-surface-variant hover:text-on-surface">How it works</a>
          {user
            ? <Link to={dashboardPath(user.role)} className="bg-primary-container text-on-primary rounded-lg px-4 py-2">Dashboard</Link>
            : <><Link to="/login" className="px-3 py-2 text-on-surface-variant hover:text-on-surface">Sign in</Link><Link to="/register" className="bg-primary-container text-on-primary rounded-lg px-4 py-2">Get started</Link></>}
        </nav>
      </div>
    </header>
  );
}
