import { useState, useEffect, useCallback } from 'react';
import { useToast } from '../../ui';
import { errMsg } from '../../services/api';
import businessService from '../../services/businessService';
import MerchantHeader from '../../components/merchant/MerchantHeader';
import Loading from '../../components/Loading';

const empty = { name: '', address: '', phone: '' };
const inp = 'w-full h-11 px-3 rounded-lg ring-1 ring-outline-variant/60 focus:ring-2 focus:ring-primary-container outline-none bg-white';

export default function Branches() {
  const toast = useToast();
  const [branches, setBranches] = useState(null), [form, setForm] = useState(empty);
  const load = useCallback(() => businessService.branches().then(setBranches).catch((e) => { toast(errMsg(e), 'err'); setBranches([]); }), [toast]);
  useEffect(() => { load(); }, [load]);
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });
  const add = async (e) => {
    e.preventDefault();
    try { await businessService.addBranch(form); setForm(empty); toast('Branch added'); load(); } catch (er) { toast(errMsg(er), 'err'); }
  };
  const remove = async (b) => {
    if (!window.confirm(`Remove ${b.name}?`)) return;
    try { await businessService.deleteBranch(b._id); toast('Branch removed'); load(); } catch (er) { toast(errMsg(er), 'err'); }
  };
  return (
    <>
      <MerchantHeader />
      <main className="ml-72 pt-24 px-8 pb-12 grid xl:grid-cols-2 gap-6">
        <form onSubmit={add} className="bg-surface-container-lowest rounded-xl border border-outline-variant/40 shadow-sm p-6 space-y-4 h-fit">
          <h1 className="font-bold text-xl">Add a branch or outlet</h1>
          <input className={inp} placeholder="Branch name, e.g. Downtown" value={form.name} onChange={set('name')} required />
          <input className={inp} placeholder="Address" value={form.address} onChange={set('address')} />
          <input className={inp} placeholder="Phone" value={form.phone} onChange={set('phone')} />
          <button className="bg-primary-container hover:bg-primary text-on-primary font-semibold rounded-lg px-5 py-2.5">Add branch</button>
        </form>
        <section className="space-y-3">
          <h2 className="font-bold text-xl">Your branches</h2>
          {branches === null ? <Loading /> : branches.length === 0 ? <p className="text-on-surface-variant">No branches yet.</p> : branches.map((b) => (
            <div key={b._id} className="bg-surface-container-lowest rounded-xl border border-outline-variant/40 p-4 flex items-center justify-between gap-3">
              <div><p className="font-bold">{b.name}</p><p className="text-sm text-on-surface-variant">{[b.address, b.phone].filter(Boolean).join(' · ') || 'No details'}</p></div>
              <button onClick={() => remove(b)} className="text-sm font-semibold text-error hover:underline">Remove</button>
            </div>))}
        </section>
      </main>
    </>
  );
}
