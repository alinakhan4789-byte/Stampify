import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Loader2 } from 'lucide-react';
import IconInput from '../../../components/form/IconInput';
import PasswordInput from '../../../components/form/PasswordInput';
import { BRAND } from '../../../config/brand';
import { PORTALS } from '../authConfig';
import useLogin from '../useLogin';
import SocialButtons from './SocialButtons';

export default function LoginForm({ portal, onAuth }) {
  const p = PORTALS[portal];
  const { form, errors, busy, setField, submit } = useLogin({ role: p.role, onAuth });
  const [remember, setRemember] = useState(true);
  return (
    <div>
      <div className="mb-6">
        <div className="flex items-center justify-between gap-3">
          <h1 className="font-display text-2xl font-semibold tracking-tight">{p.title(BRAND.name)}</h1>
          <span className={`px-2.5 py-0.5 rounded-full label-caps ${p.badgeClass}`}>{p.badge}</span>
        </div>
        <p className="text-sm text-on-surface-variant mt-1">{p.subtitle}</p>
      </div>
      <SocialButtons />
      <div className="relative flex items-center justify-center my-4">
        <div className="w-full h-px bg-surface-container-high" />
        <span className="absolute px-3 bg-surface-container-lowest label-caps text-outline">or continue with email</span>
      </div>
      <form onSubmit={submit} noValidate className="flex flex-col gap-4">
        <IconInput id="email" label={p.emailLabel} icon={p.emailIcon} type="email" autoComplete="email" placeholder={p.emailPlaceholder}
          value={form.email} onChange={setField('email')} error={errors.email} />
        <PasswordInput id="password" label={p.passwordLabel} autoComplete="current-password" placeholder="••••••••••••"
          value={form.password} onChange={setField('password')} error={errors.password}
          action={<Link to="/forgot-password" className="text-xs font-semibold text-primary hover:underline">Forgot password?</Link>} />
        
        <button disabled={busy} className="w-full h-11 rounded-lg bg-primary-container hover:bg-primary text-on-primary text-sm font-semibold flex items-center justify-center gap-1 shadow-md hover:shadow-lg active:scale-[0.99] disabled:opacity-60 transition-all">
          {busy ? <Loader2 size={18} className="animate-spin" /> : <>{p.submit}<ArrowRight size={20} /></>}
        </button>
      </form>
    </div>
  );
}
