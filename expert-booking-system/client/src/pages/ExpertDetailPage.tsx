import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { io } from 'socket.io-client';
import { api } from '../api/client';
import { Expert } from '../types';

const socket = io(import.meta.env.VITE_API_URL || 'http://localhost:5000');

export default function ExpertDetailPage() {
  const { id } = useParams();
  const [expert, setExpert] = useState<Expert | null>(null);
  const [bookedSlots, setBookedSlots] = useState<Record<string, string[]>>({});

  useEffect(() => { if (!id) return; api.get(`/experts/${id}`).then((res) => setExpert(res.data)); socket.emit('joinExpertRoom', id); const handler = (payload: { date: string; timeSlot: string }) => setBookedSlots((prev) => ({ ...prev, [payload.date]: [...(prev[payload.date] || []), payload.timeSlot] })); socket.on('slotBooked', handler); return () => { socket.off('slotBooked', handler); }; }, [id]);

  if (!expert) return <p>Loading...</p>;
  return <div className="space-y-4"><div className="border bg-white p-4"><h1 className="text-xl font-semibold">{expert.name}</h1><p className="text-gray-600">{expert.category} • {expert.experience} years • ⭐ {expert.rating}</p><p className="mt-2 text-sm">{expert.bio}</p></div><div className="border bg-white p-4"><h2 className="font-semibold mb-2">Available Slots</h2>{expert.availableSlots.map((group) => <div key={group.date} className="mb-3"><p className="text-sm font-medium">{group.date}</p><div className="flex flex-wrap gap-2 mt-2">{group.slots.map((slot) => { const isBooked = (bookedSlots[group.date] || []).includes(slot); return <span key={slot} className={`px-3 py-1 text-sm border ${isBooked ? 'bg-red-100 text-red-700 border-red-300' : 'bg-green-100 text-green-700 border-green-300'}`}>{slot}</span>; })}</div></div>)}</div><Link to={`/experts/${expert._id}/book`} className="inline-block px-4 py-2 bg-black text-white">Book Session</Link></div>;
}
