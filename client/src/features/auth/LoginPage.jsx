import { useState } from 'react';
import AuthHeader from './components/AuthHeader';
import AuthFooter from './components/AuthFooter';
import PortalTabs from './components/PortalTabs';
import LoginForm from './components/LoginForm';
import PortalFooterLinks from './components/PortalFooterLinks';


export default function LoginPage({ onAuth }) {
  const [portal, setPortal] = useState('merchant');
  return (
    <div className="min-h-screen flex flex-col bg-surface text-on-surface font-body selection:bg-primary-fixed">
      <AuthHeader />
      <main className="relative isolate overflow-hidden flex-1 pt-16 px-4 py-8 flex flex-col items-center justify-center">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[540px] bg-primary-container/10 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute top-1/4 right-1/4 w-[360px] h-[360px] bg-secondary-fixed/30 rounded-full blur-2xl pointer-events-none -z-10" />
        <div className="w-full max-w-xl flex flex-col items-center mt-6">
      
          <div className="w-full bg-surface-container-lowest rounded-xl shadow-xl p-4 sm:p-8 relative overflow-hidden">
            <PortalTabs portal={portal} onChange={setPortal} />
            <LoginForm key={portal} portal={portal} onAuth={onAuth} />
            <PortalFooterLinks portal={portal} onSwitch={setPortal} />
          </div>
        </div>
      </main>
      <AuthFooter />
    </div>
  );
}
