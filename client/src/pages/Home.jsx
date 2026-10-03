import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import StampCircle from '../components/StampCircle';

const STEPS = [
  ['storefront', 'Business creates a program', 'Set how many stamps are needed and what the reward is.'],
  ['qr_code_2', 'Customer joins and shows a QR', 'One digital card per business, always in their pocket.'],
  ['redeem', 'Stamp, unlock, redeem', 'The business scans the QR, stamps add up, and the reward unlocks.'],
];

export default function Home() {
  return (
    <div className="min-h-screen bg-surface text-on-surface font-body">
      <Navbar />
      <main>
        <section className="max-w-6xl mx-auto px-4 py-16 sm:py-24 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="font-display font-extrabold text-4xl sm:text-5xl leading-tight">Turn every visit into a reason to come back.</h1>
            <p className="mt-4 text-on-surface-variant text-lg">Stampify replaces paper punch cards with digital loyalty cards for cafes, salons, wash centres and every local shop.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/register?role=business" className="bg-primary-container hover:bg-primary text-on-primary font-semibold rounded-lg px-6 py-3">I run a business</Link>
              <Link to="/register?role=customer" className="bg-surface-container-lowest border border-outline-variant/60 font-semibold rounded-lg px-6 py-3 hover:bg-surface-container">I'm a customer</Link>
            </div>
          </div>
          <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/40 shadow-xl p-6">
            <p className="text-sm text-on-surface-variant">Coffee Rewards</p><p className="font-bold text-lg mb-4">Buy 5, get 1 free</p>
            <div className="flex gap-3">{[1, 2, 3, 4, 5].map((n) => <StampCircle key={n} n={n} filled={n <= 3} />)}</div>
            <p className="mt-4 text-sm"><b>2 more stamps</b> for a free coffee</p>
          </div>
        </section>
        <section id="how" className="max-w-6xl mx-auto px-4 pb-16">
          <h2 className="font-display font-bold text-2xl mb-6">How it works</h2>
          <div className="grid md:grid-cols-3 gap-5">{STEPS.map(([icon, t, d]) => (
            <div key={t} className="bg-surface-container-lowest rounded-xl border border-outline-variant/40 p-6"><span className="material-symbols-outlined text-primary mb-2 block">{icon}</span><h3 className="font-bold">{t}</h3><p className="text-sm text-on-surface-variant mt-1">{d}</p></div>))}</div>
        </section>
        <section className="max-w-6xl mx-auto px-4 pb-20 grid md:grid-cols-2 gap-5">
          <div className="bg-primary-fixed rounded-xl p-6"><h3 className="font-bold text-lg">For customers</h3><p className="text-sm mt-1">No cards to lose. See your progress, your rewards and every business you collect at.</p></div>
          <div className="bg-secondary-fixed rounded-xl p-6"><h3 className="font-bold text-lg">For businesses</h3><p className="text-sm mt-1">Create a program in a minute, scan to stamp, and see which customers keep returning.</p></div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
