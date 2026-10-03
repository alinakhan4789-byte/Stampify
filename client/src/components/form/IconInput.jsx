// Labelled input with a leading icon, optional trailing slot and inline error.
export default function IconInput({ id, label, icon: Icon, error, action, right, ...input }) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center justify-between">
        <label htmlFor={id} className="text-sm font-semibold text-on-surface">{label}</label>
        {action}
      </div>
      <div className="relative flex items-center">
        <Icon size={20} className="absolute left-3.5 text-outline pointer-events-none" aria-hidden />
        <input id={id} aria-invalid={!!error}
          className={`w-full h-11 pl-11 ${right ? 'pr-11' : 'pr-4'} bg-surface-container-lowest rounded-lg shadow-sm ring-1 focus:outline-none focus:ring-2 transition-all placeholder:text-outline/70 ${error ? 'ring-error' : 'ring-outline-variant/60 focus:ring-primary-container'}`}
          {...input} />
        {right}
      </div>
      {error && <span className="text-xs text-error">{error}</span>}
    </div>
  );
}
