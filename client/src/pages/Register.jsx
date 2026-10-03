import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Mail, User, Store } from 'lucide-react';
import AuthHeader from '../features/auth/components/AuthHeader';
import AuthFooter from '../features/auth/components/AuthFooter';
import IconInput from '../components/form/IconInput';
import PasswordInput from '../components/form/PasswordInput';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../ui';
import { validate } from '../utils';
import authService from '../services/authService';
import { errMsg } from '../services/api';

// ===============================
// EXPERIMENT 2 - ES6 FEATURES
// ===============================

// Array
const accountTypes = ['business', 'customer'];

// Arrow function + template literal
const getAccountMessage = (type) => {
  return `Stampify ${type} account selected`;
};

// Array map()
const accountLabels = accountTypes.map((type) => {
  return type.toUpperCase();
});

// Array filter()
const businessAccounts = accountTypes.filter(
  (type) => type === 'business'
);

// forEach() with anonymous function
accountTypes.forEach(function (type) {
  console.log('Available account type:', type);
});

export default function Register() {
  const { onAuth } = useAuth(),
    toast = useToast();

  const [params] = useSearchParams();

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    businessName: '',
    role:
      params.get('role') === 'customer'
        ? 'customer'
        : 'business'
  });

  const [errors, setErrors] = useState({}),
    [busy, setBusy] = useState(false);

  const biz = form.role === 'business',
    set = (k) => (e) =>
      setForm({ ...form, [k]: e.target.value });

  // ===============================
  // EXPERIMENT 2 - EVENT HANDLING
  // ===============================

  const handleAccountTypeChange = (type) => {
    console.log(getAccountMessage(type));

    if (type === 'business') {
      alert('Business account selected in Stampify.');
    }
  };

  const submit = async (e) => {
    e.preventDefault();

    const errs = validate(form, ['name', 'email', 'password']);

    if (biz && !form.businessName.trim()) {
      errs.businessName = 'Enter your business name';
    }

    setErrors(errs);

    if (Object.keys(errs).length) return;

    setBusy(true);

    try {
      onAuth(
        await authService.register({
          ...form,
          businessName: biz ? form.businessName : undefined
        })
      );
    } catch (er) {
      toast(errMsg(er), 'err');
      setBusy(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-surface text-on-surface font-body">
      <AuthHeader />

      <main className="flex-1 pt-24 px-4 pb-8 grid place-items-center">
        <form
          onSubmit={submit}
          noValidate
          className="w-full max-w-md bg-surface-container-lowest rounded-xl shadow-xl p-6 sm:p-8 space-y-4"
        >
          <h1 className="font-display text-2xl font-semibold">
            Create your Stampify account
          </h1>

          <div
            role="radiogroup"
            className="grid grid-cols-2 gap-1 p-1 bg-surface-container rounded-lg"
          >
            {[
              ['business', 'I run a business'],
              ['customer', "I'm a customer"]
            ].map(([r, l]) => (
              <button
                type="button"
                key={r}
                role="radio"
                aria-checked={form.role === r}
                onClick={() => {
                  setForm({ ...form, role: r });
                  handleAccountTypeChange(r);
                }}
                className={`py-2 rounded-md text-sm font-semibold ${
                  form.role === r
                    ? 'bg-surface-container-lowest text-primary shadow-sm'
                    : 'text-on-surface-variant'
                }`}
              >
                {l}
              </button>
            ))}
          </div>

          {biz && (
            <IconInput
              id="bn"
              label="Business name"
              icon={Store}
              value={form.businessName}
              onChange={set('businessName')}
              error={errors.businessName}
              placeholder="Artisan Roast"
            />
          )}

          <IconInput
            id="nm"
            label={biz ? 'Owner name' : 'Full name'}
            icon={User}
            value={form.name}
            onChange={set('name')}
            error={errors.name}
            autoComplete="name"
          />

          <IconInput
            id="em"
            label="Email"
            icon={Mail}
            type="email"
            value={form.email}
            onChange={set('email')}
            error={errors.email}
            autoComplete="email"
          />

          <PasswordInput
            id="pw"
            label="Password"
            value={form.password}
            onChange={set('password')}
            error={errors.password}
            autoComplete="new-password"
          />

          <button
            disabled={busy}
            className="w-full h-11 rounded-lg bg-primary-container hover:bg-primary text-on-primary font-semibold disabled:opacity-60"
          >
            {busy ? 'Creating...' : 'Create account'}
          </button>

          <p className="text-sm text-center text-on-surface-variant">
            Already registered?{' '}
            <Link
              to="/login"
              className="text-primary font-semibold"
            >
              Sign in
            </Link>
          </p>
        </form>
      </main>

      <AuthFooter />
    </div>
  );
}