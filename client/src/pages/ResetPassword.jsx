import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import AuthHeader from '../features/auth/components/AuthHeader';
import AuthFooter from '../features/auth/components/AuthFooter';
import PasswordInput from '../components/form/PasswordInput';
import { useToast } from '../ui';
import { rules } from '../utils';
import authService from '../services/authService';
import { errMsg } from '../services/api';

export default function ResetPassword() {
  const { token } = useParams(), navigate = useNavigate(), toast = useToast();
  const [password, setPassword] = useState(''), [error, setError] = useState(''), [busy, setBusy] = useState(false);
  const submit = async (e) => {
    e.preventDefault();
    const v = rules.password(password); if (v !== true) return setError(v);
    setError(''); setBusy(true);
    try { const r = await authService.resetPassword(token, password); toast(r.message); navigate('/login', { replace: true }); }
    catch (er) { toast(errMsg(er), 'err'); setBusy(false); }
  };
  return (
    <div className="min-h-screen flex flex-col bg-surface text-on-surface font-body">
      <AuthHeader />
      <main className="flex-1 pt-24 px-4 pb-8 grid place-items-center">
        <form onSubmit={submit} noValidate className="w-full max-w-md bg-surface-container-lowest rounded-xl shadow-xl p-6 sm:p-8 space-y-4">
          <h1 className="font-display text-2xl font-semibold">Choose a new password</h1>
          <PasswordInput id="np" label="New password" value={password} onChange={(e) => setPassword(e.target.value)} error={error} autoComplete="new-password" />
          <button disabled={busy} className="w-full h-11 rounded-lg bg-primary-container hover:bg-primary text-on-primary font-semibold disabled:opacity-60">{busy ? 'Saving...' : 'Update password'}</button>
          <p className="text-sm text-center"><Link to="/forgot-password" className="text-primary font-semibold">Link expired? Request a new one</Link></p>
        </form>
      </main>
      <AuthFooter />
    </div>
  );
}
