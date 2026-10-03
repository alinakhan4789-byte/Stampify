import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-surface font-body"><Navbar />
      <div className="text-center py-24 px-4"><p className="text-6xl font-extrabold text-primary">404</p><p className="mt-2 text-on-surface-variant">This page does not exist.</p>
        <Link to="/" className="inline-block mt-6 bg-primary-container text-on-primary font-semibold rounded-lg px-5 py-2.5">Back to home</Link></div>
    </div>
  );
}
