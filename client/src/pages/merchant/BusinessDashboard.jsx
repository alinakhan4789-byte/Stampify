import { useState, useEffect, useCallback } from 'react';
import { useToast } from '../../ui';
import { errMsg } from '../../services/api';
import businessService from '../../services/businessService';
import loyaltyService from '../../services/loyaltyService';
import MerchantHeader from '../../components/merchant/MerchantHeader';
import StatCard from '../../components/StatCard';
import Loading from '../../components/Loading';

const empty = { title: '', requiredStamps: 10, rewardDescription: '' };
const inp = 'w-full h-11 px-3 rounded-lg ring-1 ring-outline-variant/60 focus:ring-2 focus:ring-primary-container outline-none bg-white';

export default function BusinessDashboard() {
  const toast = useToast();
  const [data, setData] = useState(null), [form, setForm] = useState(empty);
  const load = useCallback(() => businessService.dashboard().then(setData).catch((e) => toast(errMsg(e), 'err')), [toast]);
  useEffect(() => { load(); }, [load]);
  const create = async (e) => {
    e.preventDefault();
    try { await loyaltyService.createProgram(form); setForm(empty); toast('Program created'); load(); } catch (er) { toast(errMsg(er), 'err'); }
  };
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });
  return (
    <>
      <MerchantHeader />
      <main className="ml-72 pt-24 px-8 pb-12 space-y-8">
        {!data ? <Loading /> : <>
          <h1 className="text-3xl font-extrabold tracking-tight">{data.business.businessName}</h1>
          <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
            <StatCard icon="group" label="Total customers" value={data.stats.totalCustomers} />
            <StatCard icon="approval" label="Stamps given" value={data.stats.totalStamps} />
            <StatCard icon="redeem" label="Rewards redeemed" value={data.stats.rewardsRedeemed} />
            <StatCard icon="loyalty" label="Active programs" value={data.stats.activePrograms} />
          </div>
          <div className="grid xl:grid-cols-2 gap-6">
            <form onSubmit={create} className="bg-surface-container-lowest rounded-xl border border-outline-variant/40 shadow-sm p-6 space-y-4">
              <h2 className="font-bold text-lg">Create loyalty program</h2>
              <input className={inp} placeholder="Program title, e.g. Coffee Rewards" value={form.title} onChange={set('title')} required />
              <input className={inp} type="number" min="2" max="30" value={form.requiredStamps} onChange={set('requiredStamps')} aria-label="Required stamps" />
              <input className={inp} placeholder="Reward, e.g. Free coffee" value={form.rewardDescription} onChange={set('rewardDescription')} required />
              <button className="bg-primary-container hover:bg-primary text-on-primary font-semibold rounded-lg px-5 py-2.5">Create program</button>
              <ul className="divide-y divide-outline-variant/30 text-sm">{data.programs.map((p) => <li key={p._id} className="py-2"><b>{p.title}</b> · {p.requiredStamps} stamps → {p.rewardDescription}</li>)}</ul>
            </form>
            <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/40 shadow-sm p-6">
              <h2 className="font-bold text-lg mb-3">Customers</h2>
              {data.customers.length === 0 ? <p className="text-sm text-on-surface-variant">No customers have joined yet.</p> : (
                <div className="overflow-x-auto"><table className="w-full text-sm"><thead><tr className="text-left text-on-surface-variant"><th className="pb-2">Customer</th><th>Program</th><th>Stamps</th></tr></thead>
                  <tbody>{data.customers.map((c) => <tr key={c._id} className="border-t border-outline-variant/30"><td className="py-2">{c.customer.name}<br /><span className="text-xs text-on-surface-variant">{c.customer.email}</span></td><td>{c.program.title}</td><td>{c.rewardUnlocked ? 'Reward ready' : `${c.currentStamps}/${c.program.requiredStamps}`}</td></tr>)}</tbody></table></div>)}
            </div>
          </div>
        </>}
      </main>
    </>
  );
}
