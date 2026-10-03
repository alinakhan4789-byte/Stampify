import { useState, useEffect, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../ui';
import { errMsg } from '../../services/api';
import loyaltyService from '../../services/loyaltyService';
import businessService from '../../services/businessService';
import LoyaltyCard from '../../components/LoyaltyCard';
import BusinessCard from '../../components/BusinessCard';
import Loading from '../../components/Loading';

export default function CustomerDashboard() {
  const { user } = useAuth(), toast = useToast();
  const [cards, setCards] = useState(null), [businesses, setBusinesses] = useState([]);
  const load = useCallback(async () => {
    try { const [c, b] = await Promise.all([loyaltyService.myCards(), businessService.list()]); setCards(c); setBusinesses(b); }
    catch (e) { toast(errMsg(e), 'err'); setCards((c) => c || []); }
  }, [toast]);
  useEffect(() => { load(); const t = setInterval(load, 8000); return () => clearInterval(t); }, [load]);   // pick up new stamps
  const joinedIds = useMemo(() => new Set((cards || []).map((c) => c.program._id)), [cards]);
  const act = (fn, ok) => async (arg) => { try { await fn(arg); toast(ok); load(); } catch (e) { toast(errMsg(e), 'err'); } };
  const ready = (cards || []).filter((c) => c.rewardUnlocked).length;
  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-8 pt-24 pb-12 space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div><h1 className="text-3xl font-extrabold tracking-tight">Welcome back, {user.name.split(' ')[0]}</h1>
          <p className="text-on-surface-variant">{cards ? `${cards.length} loyalty card${cards.length !== 1 ? 's' : ''}, ${ready} reward${ready !== 1 ? 's' : ''} ready` : ' '}</p></div>
        <Link to="/customer/qr" className="bg-primary-container hover:bg-primary text-on-primary font-semibold rounded-lg px-5 py-2.5 flex items-center gap-2"><span className="material-symbols-outlined">qr_code_2</span>Show my QR</Link>
      </div>
      <section><h2 className="text-xl font-bold mb-3">My cards</h2>
        {cards === null ? <Loading /> : cards.length === 0
          ? <p className="bg-surface-container-lowest rounded-xl p-8 text-center text-on-surface-variant">No cards yet. Join a business below to start collecting stamps.</p>
          : <div className="grid md:grid-cols-2 gap-5">{cards.map((c) => <LoyaltyCard key={c._id} card={c} onRedeem={act((x) => loyaltyService.redeem(x._id), 'Reward redeemed!')} />)}</div>}
      </section>
      <section><h2 className="text-xl font-bold mb-3">Discover businesses</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">{businesses.map((b) => <BusinessCard key={b._id} business={b} joinedIds={joinedIds} onJoin={act(loyaltyService.join, 'Joined! Your card is ready.')} />)}</div>
        {!businesses.length && cards && <p className="text-on-surface-variant">No businesses have signed up yet.</p>}
      </section>
    </main>
  );
}
