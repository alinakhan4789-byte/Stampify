import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail } from 'lucide-react';
import AuthHeader from '../features/auth/components/AuthHeader';
import AuthFooter from '../features/auth/components/AuthFooter';
import IconInput from '../components/form/IconInput';
import { useToast } from '../ui';
import { rules } from '../utils';
import authService from '../services/authService';
import { errMsg } from '../services/api';

export default function ForgotPassword() {
  const toast = useToast();
  const [email, setEmail] = useState(''), [error, setError] = useState(''), [done, setDone] = useState(null), [busy, setBusy] = useState(false);
  const submit = async (e) => {
    e.preventDefault();
    const v = rules.email(email); if (v !== true) return setError(v);
    setError(''); setBusy(true);
    try { setDone(await authService.forgotPassword(email)); } catch (er) { toast(errMsg(er), 'err'); }
    setBusy(false);
  };
  return (
    <div className="min-h-screen flex flex-col bg-surface text-on-surface font-body">
      <AuthHeader />
      <main className="flex-1 pt-24 px-4 pb-8 grid place-items-center">
        <div className="w-full max-w-md bg-surface-container-lowest rounded-xl shadow-xl p-6 sm:p-8 space-y-4">
          <h1 className="font-display text-2xl font-semibold">Reset your password</h1>
          {done ? (
            <>
              <p className="text-sm text-on-surface-variant">{done.message}</p>
              {done.devResetLink && <div className="bg-amber-50 rounded-lg p-3 text-sm">Development mode: no email is sent. <Link className="font-bold text-primary underline" to={new URL(done.devResetLink).pathname}>Open your reset link</Link></div>}
            </>
          ) : (
            <form onSubmit={submit} noValidate className="space-y-4">
              <p className="text-sm text-on-surface-variant">Enter your account email and we will create a reset link.</p>
              <IconInput id="fe" label="Email" icon={Mail} type="email" value={email} onChange={(e) => setEmail(e.target.value)} error={error} />
              <button disabled={busy} className="w-full h-11 rounded-lg bg-primary-container hover:bg-primary text-on-primary font-semibold disabled:opacity-60">{busy ? 'Sending...' : 'Create reset link'}</button>
            </form>)}
          <p className="text-sm text-center"><Link to="/login" className="text-primary font-semibold">Back to sign in</Link></p>
        </div>
      </main>
      <AuthFooter />
    </div>
  );
}
