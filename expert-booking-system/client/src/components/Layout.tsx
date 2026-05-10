import { Link, Outlet } from 'react-router-dom';

export default function Layout() {
  return <div className="min-h-screen"><header className="border-b bg-white"><nav className="max-w-6xl mx-auto p-4 flex gap-4 text-sm"><Link to="/" className="font-semibold">Experts</Link><Link to="/my-bookings">My Bookings</Link></nav></header><main className="max-w-6xl mx-auto p-4"><Outlet /></main></div>;
}
