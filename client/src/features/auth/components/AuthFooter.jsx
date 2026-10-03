import { BRAND } from '../../../config/brand';

const LINKS = ['Privacy Policy', 'Terms of Service', 'Support'];
export default function AuthFooter() {
  return (
    <footer className="w-full py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-12 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <span className="text-xs text-on-surface-variant">© {BRAND.year} {BRAND.legalName}. All rights reserved.</span>
        <div className="flex items-center gap-6 text-xs font-semibold text-on-surface-variant">
          {LINKS.map((l) => <button key={l} type="button" className="hover:text-on-surface">{l}</button>)}
        </div>
      </div>
    </footer>
  );
}
