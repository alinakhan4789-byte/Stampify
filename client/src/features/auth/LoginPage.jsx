import { useState } from 'react';
import AuthHeader from './components/AuthHeader';
import AuthFooter from './components/AuthFooter';
import PortalTabs from './components/PortalTabs';
import LoginForm from './components/LoginForm';
import PortalFooterLinks from './components/PortalFooterLinks';
import TrustRow from './components/TrustRow';

export default function LoginPage({ onAuth }) {
  const [portal, setPortal] = useState('merchant');
  return (
    <div className="min-h-screen flex flex-col bg-surface text-on-surface font-body selection:bg-primary-fixed">
      <AuthHeader />
      <main className="relative isolate overflow-hidden flex-1 pt-16 px-4 py-8 flex flex-col items-center justify-center">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[540px] bg-primary-container/10 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute top-1/4 right-1/4 w-[360px] h-[360px] bg-secondary-fixed/30 rounded-full blur-2xl pointer-events-none -z-10" />
        <div className="w-full max-w-xl flex flex-col items-center mt-6">
          <div className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-surface-container mb-4 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="label-caps text-primary">Terminal v4.19 operational</span>
            <span className="text-outline-variant">•</span><span className="text-xs font-semibold text-secondary">Zero friction pass auth</span>
          </div>
          <div className="w-full bg-surface-container-lowest rounded-xl shadow-xl p-4 sm:p-8 relative overflow-hidden">
            <PortalTabs portal={portal} onChange={setPortal} />
            <LoginForm key={portal} portal={portal} onAuth={onAuth} />
            <PortalFooterLinks portal={portal} onSwitch={setPortal} />
          </div>
          <TrustRow />
        </div>
      </main>
      <AuthFooter />
    </div>
  );
}
