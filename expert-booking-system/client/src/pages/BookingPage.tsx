import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { z } from 'zod';
import { api } from '../api/client';
import { Expert } from '../types';

const schema = z.object({ name: z.string().min(2), email: z.string().email(), phone: z.string().min(7), date: z.string().min(1), timeSlot: z.string().min(1), notes: z.string().optional() });
type FormData = z.infer<typeof schema>;

export default function BookingPage() {
  const { id } = useParams();
  const [expert, setExpert] = useState<Expert | null>(null);
  const [message, setMessage] = useState('');
  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm<FormData>({ resolver: zodResolver(schema) });
  const selectedDate = watch('date');

  useEffect(() => { if (id) api.get(`/experts/${id}`).then((res) => setExpert(res.data)); }, [id]);

  const onSubmit = async (data: FormData) => {
    try {
      await api.post('/bookings', { ...data, expertId: id });
      setMessage('Booking created successfully.');
    } catch (error: any) {
      setMessage(error?.response?.data?.message || 'Failed to create booking.');
    }
  };

  return <div className="max-w-xl border bg-white p-4"><h1 className="text-xl font-semibold mb-3">Book Session</h1>{message && <p className={`mb-3 ${message.includes('success') ? 'text-green-700' : 'text-red-700'}`}>{message}</p>}<form className="space-y-3" onSubmit={handleSubmit(onSubmit)}><input className="border p-2 w-full" placeholder="Name" {...register('name')} />{errors.name && <p className="text-red-600 text-sm">Invalid name</p>}<input className="border p-2 w-full" placeholder="Email" {...register('email')} />{errors.email && <p className="text-red-600 text-sm">Invalid email</p>}<input className="border p-2 w-full" placeholder="Phone" {...register('phone')} /><select className="border p-2 w-full" {...register('date')}><option value="">Select Date</option>{expert?.availableSlots.map((d) => <option key={d.date} value={d.date}>{d.date}</option>)}</select><select className="border p-2 w-full" {...register('timeSlot')}><option value="">Select Slot</option>{expert?.availableSlots.find((d) => d.date === selectedDate)?.slots.map((slot) => <option key={slot} value={slot}>{slot}</option>)}</select><textarea className="border p-2 w-full" placeholder="Notes" {...register('notes')} /><button disabled={isSubmitting} className="bg-black text-white px-4 py-2">{isSubmitting ? 'Booking...' : 'Confirm Booking'}</button></form></div>;
}
