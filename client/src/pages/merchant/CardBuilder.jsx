import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../ui';
import { errMsg } from '../../services/api';
import businessService from '../../services/businessService';
import loyaltyService from '../../services/loyaltyService';
import MerchantHeader from '../../components/merchant/MerchantHeader';
import LoyaltyCard from '../../components/LoyaltyCard';
import Loading from '../../components/Loading';

const empty = { title: '', description: '', requiredStamps: 10, rewardDescription: '' };
const inp = 'w-full h-11 px-3 rounded-lg ring-1 ring-outline-variant/60 focus:ring-2 focus:ring-primary-container outline-none bg-white';

export default function CardBuilder() {
  const { user } = useAuth(), toast = useToast();
  const [programs, setPrograms] = useState(null), [form, setForm] = useState(empty);
  const load = useCallback(() => businessService.dashboard().then((d) => setPrograms(d.programs)).catch((e) => { toast(errMsg(e), 'err'); setPrograms([]); }), [toast]);
  useEffect(() => { load(); }, [load]);
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });
  const run = (fn, ok) => async () => { try { await fn(); toast(ok); load(); } catch (er) { toast(errMsg(er), 'err'); } };
  const create = async (e) => {
    e.preventDefault();
    await run(() => loyaltyService.createProgram(form), 'Loyalty pass published')();
    setForm(empty);
  };
  const n = Math.min(30, Math.max(2, Number(form.requiredStamps) || 2));
  const preview = { business: { businessName: user.businessName }, program: { title: form.title || 'Your program name', requiredStamps: n, rewardDescription: form.rewardDescription || 'Your reward' }, currentStamps: Math.min(3, n - 1), rewardUnlocked: false };
  return (
    <>
      <MerchantHeader />
      <main className="ml-72 pt-24 px-8 pb-12 grid xl:grid-cols-2 gap-6">
        <div className="space-y-6">
          <form onSubmit={create} className="bg-surface-container-lowest rounded-xl border border-outline-variant/40 shadow-sm p-6 space-y-4">
            <h1 className="font-bold text-xl">Design a loyalty pass</h1>
            <input className={inp} placeholder="Program name, e.g. Coffee Rewards" value={form.title} onChange={set('title')} required />
            <input className={inp} placeholder="Short description (optional)" value={form.description} onChange={set('description')} />
            <label className="block text-sm font-semibold">Stamps required (2-30)<input className={`${inp} mt-1`} type="number" min="2" max="30" value={form.requiredStamps} onChange={set('requiredStamps')} /></label>
            <input className={inp} placeholder="Reward, e.g. Free coffee" value={form.rewardDescription} onChange={set('rewardDescription')} required />
            <button className="bg-primary-container hover:bg-primary text-on-primary font-semibold rounded-lg px-5 py-2.5">Publish pass</button>
          </form>
          <section className="space-y-3">
            <h2 className="font-bold text-lg">Your passes</h2>
            {programs === null ? <Loading /> : programs.length === 0 ? <p className="text-on-surface-variant text-sm">No passes yet.</p> : programs.map((p) => (
              <div key={p._id} className="bg-surface-container-lowest rounded-xl border border-outline-variant/40 p-4 flex flex-wrap items-center justify-between gap-3">
                <div><p className="font-bold">{p.title} <span className={`ml-1 px-2 py-0.5 rounded-full label-caps ${p.isActive ? 'bg-emerald-100 text-emerald-800' : 'bg-surface-container text-on-surface-variant'}`}>{p.isActive ? 'Active' : 'Paused'}</span></p>
                  <p className="text-sm text-on-surface-variant">{p.requiredStamps} stamps → {p.rewardDescription}</p></div>
                <div className="flex gap-3 text-sm font-semibold">
                  <button onClick={run(() => loyaltyService.updateProgram(p._id, { isActive: !p.isActive }), p.isActive ? 'Pass paused' : 'Pass activated')} className="text-primary hover:underline">{p.isActive ? 'Pause' : 'Activate'}</button>
                  <button onClick={() => window.confirm(`Delete ${p.title}?`) && run(() => loyaltyService.deleteProgram(p._id), 'Pass deleted')()} className="text-error hover:underline">Delete</button>
                </div>
              </div>))}
          </section>
        </div>
        <div className="xl:sticky xl:top-24 h-fit"><p className="text-sm text-on-surface-variant mb-2">Live preview, as customers will see it</p><LoyaltyCard card={preview} onRedeem={() => {}} /></div>
      </main>
    </>
  );
}
