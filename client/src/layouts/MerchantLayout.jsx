import { Outlet } from 'react-router-dom';
import Sidebar from '../components/merchant/Sidebar';

export default function MerchantLayout() {
  return (
    <div className="bg-surface font-body-md text-on-surface antialiased">
      <Sidebar />
      <Outlet />
    </div>
  );
}
