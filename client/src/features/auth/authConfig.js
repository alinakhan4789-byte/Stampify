import { Store, Wallet, Mail } from 'lucide-react';

// All copy per portal lives here, so LoginForm stays generic.
export const PORTALS = {
  merchant: {
    role: 'business', tabLabel: 'Merchant / Business Sign In', tabIcon: Store, emailIcon: Store,
    badge: 'Console', badgeClass: 'bg-primary-fixed text-on-primary-fixed',
    title: (brand) => `Sign in to ${brand} Merchant OS`,
    subtitle: 'Access your cashier stamp terminal, loyalty cards, and analytics.',
    emailLabel: 'Work Email Address', emailPlaceholder: 'owner@artisanroast.com',
    passwordLabel: 'Merchant Master Password', submit: 'Sign In to Merchant Console',
  },
  customer: {
    role: 'customer', tabLabel: 'Customer Digital Pass Sign In', tabIcon: Wallet, emailIcon: Mail,
    badge: 'Customer', badgeClass: 'bg-secondary-fixed text-on-secondary-fixed',
    title: () => 'Your Digital Stamp Pass',
    subtitle: 'Check collected stamps, claim rewards, and show your QR code at the counter.',
    emailLabel: 'Email Address', emailPlaceholder: 'you@example.com',
    passwordLabel: 'Password', submit: 'Sign In to My Pass',
  },
};
