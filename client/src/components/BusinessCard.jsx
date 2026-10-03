export default function BusinessCard({ business, joinedIds, onJoin }) {
  return (
    <article className="bg-surface-container-lowest rounded-xl border border-outline-variant/40 shadow-sm p-5">
      <h3 className="font-bold text-lg">{business.businessName}</h3>
      <p className="text-xs text-on-surface-variant mb-3">{business.category}{business.address && ` · ${business.address}`}</p>
      {business.programs.length === 0 && <p className="text-sm text-on-surface-variant">No active programs yet.</p>}
      {business.programs.map((p) => (
        <div key={p._id} className="flex items-center justify-between gap-3 py-2 border-t border-outline-variant/30">
          <p className="text-sm"><b>{p.title}</b><br /><span className="text-on-surface-variant">{p.requiredStamps} stamps → {p.rewardDescription}</span></p>
          {joinedIds.has(p._id)
            ? <span className="text-xs font-bold text-emerald-700">Joined</span>
            : <button onClick={() => onJoin(p._id)} className="shrink-0 bg-primary-container text-on-primary text-sm font-semibold rounded-lg px-3 py-1.5 hover:bg-primary">Join</button>}
        </div>))}
    </article>
  );
}
