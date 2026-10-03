import { useState, useEffect, useCallback } from 'react';
import { useToast } from '../../ui';
import { errMsg } from '../../services/api';
import loyaltyService from '../../services/loyaltyService';
import LoyaltyCard from '../../components/LoyaltyCard';
import Loading from '../../components/Loading';

const FILTERS = [['all', 'All'], ['ready', 'Reward ready'], ['progress', 'In progress']];

export default function MyCards() {
  const toast = useToast();
  const [cards, setCards] = useState(null), [filter, setFilter] = useState('all');
  const load = useCallback(() => loyaltyService.myCards().then(setCards).catch((e) => { toast(errMsg(e), 'err'); setCards([]); }), [toast]);
  useEffect(() => { load(); }, [load]);
  const redeem = async (c) => { try { await loyaltyService.redeem(c._id); toast('Reward redeemed!'); load(); } catch (e) { toast(errMsg(e), 'err'); } };
  const shown = (cards || []).filter((c) => filter === 'all' || (filter === 'ready' ? c.rewardUnlocked : !c.rewardUnlocked));
  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-8 pt-24 pb-12">
      <h1 className="text-3xl font-extrabold mb-4">My cards</h1>
      <div className="flex gap-2 mb-5">{FILTERS.map(([k, l]) => <button key={k} onClick={() => setFilter(k)} className={`px-4 py-1.5 rounded-full text-sm font-semibold ${filter === k ? 'bg-primary-container text-on-primary' : 'bg-surface-container-lowest border border-outline-variant/50'}`}>{l}</button>)}</div>
      {cards === null ? <Loading /> : shown.length === 0 ? <p className="text-on-surface-variant">Nothing here yet. Join a business from your dashboard.</p>
        : <div className="grid md:grid-cols-2 gap-5">{shown.map((c) => <LoyaltyCard key={c._id} card={c} onRedeem={redeem} />)}</div>}
    </main>
  );
}
