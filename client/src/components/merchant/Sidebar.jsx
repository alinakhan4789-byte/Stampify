import { NavLink } from 'react-router-dom';

const ITEMS = [
  {
    "to": "/business",
    "icon": "point_of_sale",
    "label": "Terminal & Dashboard"
  },
  {
    "to": "/business/cards",
    "icon": "style",
    "label": "Loyalty Passes"
  },
  {
    "to": "/business/branches",
    "icon": "store",
    "label": "Store & Branches"
  },
  {
    "to": "/business/profile",
    "icon": "badge",
    "label": "Business Profile"
  },
  {
    "to": "/business/scan",
    "icon": "qr_code_scanner",
    "label": "Scan & Stamp"
  }
];
const ACTIVE = "flex items-center gap-space-md px-space-md py-space-sm transition-colors bg-primary-container text-on-primary font-label-lg rounded-lg shadow-sm";
const IDLE = "flex items-center gap-space-md px-space-md py-space-sm rounded-lg text-on-surface-variant font-label-lg text-label-lg hover:bg-surface-container-high hover:text-on-surface transition-colors";

export default function Sidebar() {
  return (
<aside className="fixed left-0 top-0 h-full w-72 bg-surface-container-low z-50 flex flex-col justify-between py-space-lg shadow-[0_1px_8px_rgba(0,0,0,0.04)]"><div className="flex flex-col gap-space-lg"><div className="px-space-lg flex items-center gap-space-sm"><span className="w-8 h-8 rounded-lg bg-primary-container text-on-primary grid place-items-center shrink-0"><span className="material-symbols-outlined text-[18px]">verified</span></span><div className="flex flex-col"><span className="font-title-md text-title-md text-on-surface tracking-tight leading-none">Stampify</span><span className="font-label-caps text-label-caps text-on-surface-variant tracking-wider uppercase mt-space-xs">Merchant OS</span></div></div><div className="px-space-md"><nav className="flex flex-col gap-space-xs">
          {ITEMS.map((i) => (
            <NavLink key={i.to} to={i.to} end={i.to === '/business'} className={({ isActive }) => (isActive ? ACTIVE : IDLE)}>
              <span className="material-symbols-outlined text-[20px]">{i.icon}</span>{i.label}
            </NavLink>))}
        </nav></div></div><div className="px-space-md flex flex-col gap-space-sm"><div className="bg-surface-container-lowest p-space-md rounded-xl shadow-[0_1px_3px_0_rgba(15,23,42,0.04)] flex items-center justify-between"><div className="flex flex-col"><span className="font-label-caps text-label-caps text-on-surface-variant uppercase">Terminal Node</span><span className="font-label-md text-label-md text-on-surface flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span>Active Online</span></div><span className="font-label-caps text-label-caps bg-secondary-container text-on-secondary-container px-2 py-0.5 rounded-full">POS-04</span></div></div></aside>
  );
}
