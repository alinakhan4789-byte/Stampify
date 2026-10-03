import { useState, useEffect } from 'react';
import { useToast } from '../../ui';
import { errMsg } from '../../services/api';
import businessService from '../../services/businessService';
import loyaltyService from '../../services/loyaltyService';
import MerchantHeader from '../../components/merchant/MerchantHeader';
import QrScanner from '../../components/QrScanner';

// Accepts the JSON payload from the customer QR, or a plain email
const emailFrom = (text) => { try { const d = JSON.parse(text); if (d.type === 'stampify-customer') return d.email; } catch { /* plain text */ } return text.trim(); };
const field = 'w-full h-11 px-3 rounded-lg ring-1 ring-outline-variant/60 focus:ring-2 focus:ring-primary-container outline-none bg-white';

export default function BusinessScan() {
  const toast = useToast();
  const [email, setEmail] = useState(''), [programs, setPrograms] = useState([]), [programId, setProgramId] = useState(''), [result, setResult] = useState(null), [busy, setBusy] = useState(false);
  useEffect(() => { businessService.dashboard().then((d) => setPrograms(d.programs.filter((p) => p.isActive))).catch(() => {}); }, []);
  const stamp = async () => {
    if (!email) return toast('Scan a QR code or enter an email first', 'err');
    setBusy(true);
    try { const r = await loyaltyService.stamp({ email, programId: programId || undefined }); setResult(r); toast(r.message); }
    catch (e) { setResult(null); toast(errMsg(e), 'err'); }
    setBusy(false);
  };
  return (
    <>
      <MerchantHeader />
      <main className="ml-72 pt-24 px-8 pb-12 grid xl:grid-cols-2 gap-6">
        <section className="bg-surface-container-lowest rounded-xl border border-outline-variant/40 shadow-sm p-6">
          <h1 className="font-bold text-xl mb-3">Scan customer QR</h1>
          <QrScanner onScan={(t) => { setEmail(emailFrom(t)); setResult(null); toast('QR code read'); }} />
        </section>
        <section className="bg-surface-container-lowest rounded-xl border border-outline-variant/40 shadow-sm p-6 space-y-4">
          <h2 className="font-bold text-lg">Add stamp</h2>
          <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Customer email (manual fallback)" className={field} />
          {programs.length > 1 && <select value={programId} onChange={(e) => setProgramId(e.target.value)} className={field}><option value="">Latest joined program</option>{programs.map((p) => <option key={p._id} value={p._id}>{p.title}</option>)}</select>}
          <button disabled={busy} onClick={stamp} className="w-full h-11 rounded-lg bg-primary-container hover:bg-primary text-on-primary font-semibold disabled:opacity-60">{busy ? 'Adding...' : 'Add stamp'}</button>
          {result && (
            <div className={`rounded-lg p-4 ${result.card.rewardUnlocked ? 'bg-amber-50' : 'bg-emerald-50'}`}>
              <p className="font-bold">{result.customer.name}</p><p className="text-sm text-on-surface-variant">{result.customer.email}</p>
              <p className="mt-2 text-lg font-extrabold">{result.card.currentStamps}/{result.card.program.requiredStamps} stamps</p>
              <p className="text-sm">{result.card.rewardUnlocked ? `Reward unlocked: ${result.card.program.rewardDescription}` : result.message}</p>
            </div>)}
        </section>
      </main>
    </>
  );
}
