import { useState } from 'react';
import { api } from '../api/client';
import { Booking } from '../types';

const statusColor: Record<string, string> = { Pending: 'text-yellow-700', Confirmed: 'text-blue-700', Completed: 'text-green-700' };

export default function MyBookingsPage() {
  const [email, setEmail] = useState('');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [error, setError] = useState('');

  const fetchBookings = async () => {
    try {
      setError('');
      const res = await api.get('/bookings', { params: { email } });
      setBookings(res.data);
    } catch {
      setError('Failed to load bookings');
    }
  };

  return <div className="space-y-4"><h1 className="text-xl font-semibold">My Bookings</h1><div className="flex gap-2"><input className="border p-2" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" /><button onClick={fetchBookings} className="bg-black text-white px-4">Search</button></div>{error && <p className="text-red-700">{error}</p>}<div className="space-y-2">{bookings.map((booking) => <div key={booking._id} className="border bg-white p-3"><p className="font-medium">{booking.expertName}</p><p className="text-sm">{booking.date} at {booking.timeSlot}</p><p className={`text-sm ${statusColor[booking.status]}`}>{booking.status}</p></div>)}</div></div>;
}
