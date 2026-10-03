import { PORTALS } from '../authConfig';

export default function PortalTabs({ portal, onChange }) {
  return (
    <div role="tablist" className="w-full p-1 bg-surface-container rounded-lg flex gap-1 mb-6">
      {Object.entries(PORTALS).map(([key, p]) => {
        const Icon = p.tabIcon, on = key === portal;
        return (
          <button key={key} type="button" role="tab" aria-selected={on} onClick={() => onChange(key)}
            className={`flex-1 py-2.5 px-3 rounded-md text-sm flex items-center justify-center gap-1.5 transition-all ${on ? 'bg-surface-container-lowest text-primary shadow-sm font-bold' : 'text-on-surface-variant hover:text-on-surface font-semibold'}`}>
            <Icon size={18} /><span>{p.tabLabel}</span>
          </button>);
      })}
    </div>
  );
}
