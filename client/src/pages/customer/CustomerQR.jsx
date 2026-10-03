import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import QRCodeCard from '../../components/QRCodeCard';

export default function CustomerQR() {
  const { user } = useAuth();
  return (
    <main className="max-w-xl mx-auto px-4 pt-24 pb-12">
      <h1 className="text-2xl font-extrabold mb-4 text-center">My member QR</h1>
      <QRCodeCard user={user} />
      <p className="text-center mt-5"><Link to="/customer" className="text-primary font-semibold">← Back to my cards</Link></p>
    </main>
  );
}
