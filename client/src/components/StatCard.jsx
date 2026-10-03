export default function StatCard({ icon, label, value }) {
  return (
    <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/40 shadow-sm p-5">
      <span className="material-symbols-outlined text-primary mb-2 block">{icon}</span>
      <p className="text-3xl font-extrabold">{value}</p><p className="text-sm text-on-surface-variant">{label}</p>
    </div>
  );
}
