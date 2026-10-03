import { useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { ToastProvider } from './ui';
import { AuthContext } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import MerchantLayout from './layouts/MerchantLayout';
import CustomerLayout from './layouts/CustomerLayout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import CustomerDashboard from './pages/customer/CustomerDashboard';
import MyCards from './pages/customer/MyCards';
import Rewards from './pages/customer/Rewards';
import CustomerQR from './pages/customer/CustomerQR';
import BusinessDashboard from './pages/merchant/BusinessDashboard';
import BusinessScan from './pages/merchant/BusinessScan';
import BusinessProfile from './pages/merchant/BusinessProfile';
import CardBuilder from './pages/merchant/CardBuilder';
import Branches from './pages/merchant/Branches';
import { dashboardPath } from './utils/helpers';

export default function App() {
  const nav = useNavigate();
  const [user, setUser] = useState(() => JSON.parse(sessionStorage.getItem('user') || 'null'));
  const save = (u) => { sessionStorage.setItem('user', JSON.stringify(u)); setUser(u); };
  const onAuth = ({ token, user }) => { sessionStorage.setItem('token', token); save(user); nav(dashboardPath(user.role), { replace: true }); };
  const logout = () => { sessionStorage.clear(); setUser(null); nav('/login'); };
  const updateUser = (patch) => save({ ...user, ...patch });
  const guest = (el) => (user ? <Navigate to={dashboardPath(user.role)} replace /> : el);
  return (
    <AuthContext.Provider value={{ user, onAuth, logout, updateUser }}>
      <ToastProvider>
        <Routes>
          <Route path="/" element={guest(<Home />)} />
          <Route path="/login" element={guest(<Login onAuth={onAuth} />)} />
          <Route path="/register" element={guest(<Register />)} />
          <Route path="/forgot-password" element={guest(<ForgotPassword />)} />
          <Route path="/reset-password/:token" element={guest(<ResetPassword />)} />

          <Route element={<ProtectedRoute role="business" />}>
            <Route element={<MerchantLayout />}>
              <Route path="/business" element={<BusinessDashboard />} />
              <Route path="/business/scan" element={<BusinessScan />} />
              <Route path="/business/profile" element={<BusinessProfile />} />
              <Route path="/business/cards" element={<CardBuilder />} />
              <Route path="/business/branches" element={<Branches />} />
            </Route>
          </Route>

          <Route element={<ProtectedRoute role="customer" />}>
            <Route element={<CustomerLayout />}>
              <Route path="/customer" element={<CustomerDashboard />} />
              <Route path="/customer/cards" element={<MyCards />} />
              <Route path="/customer/rewards" element={<Rewards />} />
              <Route path="/customer/qr" element={<CustomerQR />} />
            </Route>
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </ToastProvider>
    </AuthContext.Provider>
  );
}
