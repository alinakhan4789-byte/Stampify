import { Outlet } from 'react-router-dom';
import CustomerHeader from '../components/customer/CustomerHeader';
import CustomerFooter from '../components/customer/CustomerFooter';

export default function CustomerLayout() {
  return (
      <div className="min-h-screen flex flex-col bg-surface font-body-md text-on-surface antialiased">
        <CustomerHeader />
        <div className="flex-1">
        <Outlet />
        </div>
        <CustomerFooter />
    </div>
  );
}
