import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../ui';
import { errMsg } from '../../services/api';
import businessService from '../../services/businessService';
import MerchantHeader from '../../components/merchant/MerchantHeader';
import Loading from '../../components/Loading';

const FIELDS = [['businessName', 'Business name'], ['category', 'Category (Cafe, Salon, Car wash...)'], ['address', 'Address'], ['phone', 'Phone']];
const inp = 'w-full h-11 px-3 rounded-lg ring-1 ring-outline-variant/60 focus:ring-2 focus:ring-primary-container outline-none bg-white';

export default function BusinessProfile() {
  const { updateUser } = useAuth(), toast = useToast();
  const [form, setForm] = useState(null);
  useEffect(() => { businessService.dashboard().then((d) => setForm(d.business)).catch((e) => toast(errMsg(e), 'err')); }, [toast]);
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });
  const save = async (e) => {
    e.preventDefault();
    try { const b = await businessService.updateMe(form); updateUser({ businessName: b.businessName }); toast('Profile saved'); } catch (er) { toast(errMsg(er), 'err'); }
  };
  return (
    <>
      <MerchantHeader />
      <main className="ml-72 pt-24 px-8 pb-12 max-w-2xl">
        <h1 className="text-3xl font-extrabold mb-5">Business profile</h1>
        {!form ? <Loading /> : (
          <form onSubmit={save} className="bg-surface-container-lowest rounded-xl border border-outline-variant/40 shadow-sm p-6 space-y-4">
            {FIELDS.map(([k, l]) => <label key={k} className="block text-sm font-semibold">{l}<input className={`${inp} mt-1 font-normal`} value={form[k] || ''} onChange={set(k)} required={k === 'businessName'} /></label>)}
            <label className="block text-sm font-semibold">Description<textarea rows="3" className={`${inp} mt-1 h-auto py-2 font-normal`} value={form.description || ''} onChange={set('description')} /></label>
            <button className="bg-primary-container hover:bg-primary text-on-primary font-semibold rounded-lg px-5 py-2.5">Save profile</button>
          </form>)}
      </main>
    </>
  );
}
