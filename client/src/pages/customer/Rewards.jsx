import { useState, useEffect, useCallback } from 'react';
import { useToast } from '../../ui';
import { errMsg } from '../../services/api';
import loyaltyService from '../../services/loyaltyService';
import RewardCard from '../../components/RewardCard';
import Loading from '../../components/Loading';

export default function Rewards() {
  const toast = useToast();
  const [rewards, setRewards] = useState(null);
  const load = useCallback(() => loyaltyService.rewards().then(setRewards).catch((e) => { toast(errMsg(e), 'err'); setRewards([]); }), [toast]);
  useEffect(() => { load(); }, [load]);
  const redeem = async (r) => { try { await loyaltyService.redeemReward(r._id); toast('Reward redeemed!'); load(); } catch (e) { toast(errMsg(e), 'err'); } };
  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-8 pt-24 pb-12 space-y-4">
      <h1 className="text-3xl font-extrabold">Rewards</h1>
      {rewards === null ? <Loading /> : rewards.length === 0 ? <p className="text-on-surface-variant">No rewards yet. Fill a card to unlock one.</p>
        : rewards.map((r) => <RewardCard key={r._id} reward={r} onRedeem={redeem} />)}
    </main>
  );
}
