import { Outlet } from 'react-router-dom';
import CustomerHeader from '../components/customer/CustomerHeader';
import CustomerFooter from '../components/customer/CustomerFooter';

export default function CustomerLayout() {
  return (
    <div className="bg-surface font-body-md text-on-surface antialiased">
      <CustomerHeader />
      <Outlet />
      <CustomerFooter />
    </div>
  );
}
