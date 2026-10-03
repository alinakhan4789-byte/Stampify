export default function StampCircle({ n, filled }) {
  return (
    <div className={`w-10 h-10 rounded-full grid place-items-center text-sm font-bold border-2 ${filled ? 'bg-primary-container border-primary-container text-on-primary' : 'border-dashed border-outline-variant text-outline'}`}>
      {filled ? <span className="material-symbols-outlined text-[20px]">check</span> : n}
    </div>
  );
}
