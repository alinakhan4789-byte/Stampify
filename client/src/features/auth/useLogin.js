import { useState } from 'react';
import api, { errMsg } from '../../api';
import { validate } from '../../utils';
import { useToast } from '../../ui';

// Form state, validation and the /auth/login call. `role` is the portal tab the user chose.
export default function useLogin({ role, onAuth }) {
  const toast = useToast();
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [busy, setBusy] = useState(false);
  const setField = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    const errs = { ...validate(form, ['email']), ...(form.password ? {} : { password: 'Enter your password' }) };
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setBusy(true);
    try {
      const { data } = await api.post('/auth/login', form);
      if (data.user.role !== role) {
        toast(`This is a ${data.user.role} account. Switch to the ${data.user.role} tab.`, 'err');
        return setBusy(false);
      }
      onAuth(data);
    } catch (er) { toast(errMsg(er), 'err'); setBusy(false); }
  };
  return { form, errors, busy, setField, submit };
}
