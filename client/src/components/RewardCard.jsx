import { formatDate } from '../utils/helpers';

export default function RewardCard({ reward, onRedeem }) {
  const ready = reward.status === 'unlocked';
  return (
    <article className={`rounded-xl border p-5 flex items-center justify-between gap-4 bg-surface-container-lowest ${ready ? 'border-amber-400' : 'border-outline-variant/40 opacity-80'}`}>
      <div className="flex items-center gap-3">
        <span className={`w-11 h-11 rounded-full grid place-items-center ${ready ? 'bg-amber-100 text-amber-600' : 'bg-surface-container text-outline'}`}><span className="material-symbols-outlined">redeem</span></span>
        <div><p className="font-bold">{reward.description}</p><p className="text-xs text-on-surface-variant">{reward.business?.businessName} · {reward.title} · {formatDate(reward.createdAt)}</p></div>
      </div>
      {ready ? <button onClick={() => onRedeem(reward)} className="bg-amber-500 hover:bg-amber-600 text-white text-sm font-bold rounded-lg px-4 py-2">Redeem</button>
        : <span className="text-xs font-bold text-emerald-700">Redeemed</span>}
    </article>
  );
}
