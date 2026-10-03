import StampCircle from './StampCircle';

export default function LoyaltyCard({ card, onRedeem }) {
  const need = card.program.requiredStamps, left = need - card.currentStamps;
  return (
    <article className={`bg-surface-container-lowest rounded-xl border shadow-sm p-5 ${card.rewardUnlocked ? 'border-amber-400 ring-2 ring-amber-200' : 'border-outline-variant/40'}`}>
      <div className="flex justify-between gap-3">
        <div><p className="text-sm text-on-surface-variant">{card.business?.businessName}</p><h3 className="font-bold text-lg">{card.program.title}</h3></div>
        <span className="self-start px-2.5 py-1 rounded-full bg-primary-fixed text-on-primary-fixed label-caps">{card.currentStamps}/{need}</span>
      </div>
      <div className="flex flex-wrap gap-2 my-4">{Array.from({ length: need }, (_, i) => <StampCircle key={i} n={i + 1} filled={i < card.currentStamps} />)}</div>
      <div className="h-2 bg-surface-container rounded-full overflow-hidden"><div className="h-2 bg-primary-container rounded-full transition-all" style={{ width: `${(card.currentStamps / need) * 100}%` }} /></div>
      {card.rewardUnlocked ? (
        <div className="mt-4 flex items-center justify-between gap-3 bg-amber-50 rounded-lg p-3">
          <p className="text-sm"><b>Reward unlocked:</b> {card.program.rewardDescription}</p>
          <button onClick={() => onRedeem(card)} className="shrink-0 bg-amber-500 hover:bg-amber-600 text-white text-sm font-bold rounded-lg px-4 py-2">Redeem</button>
        </div>
      ) : <p className="mt-3 text-sm text-on-surface-variant">{left} more stamp{left > 1 && 's'} for <b>{card.program.rewardDescription}</b></p>}
    </article>
  );
}
