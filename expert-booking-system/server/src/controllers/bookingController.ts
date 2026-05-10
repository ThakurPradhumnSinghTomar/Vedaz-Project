import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { z } from 'zod';
import { Booking } from '../models/Booking';
import { Expert } from '../models/Expert';
import { io } from '../socket';

const createBookingSchema = z.object({
  expertId: z.string(),
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(7),
  date: z.string().min(1),
  timeSlot: z.string().min(1),
  notes: z.string().optional()
});

export const createBooking = async (req: Request, res: Response) => {
  const parsed = createBookingSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ message: 'Validation failed', errors: parsed.error.flatten() });
  }

  const payload = parsed.data;
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const expert = await Expert.findById(payload.expertId).session(session);
    if (!expert) {
      await session.abortTransaction();
      return res.status(404).json({ message: 'Expert not found' });
    }

    const booking = await Booking.create([
      { ...payload, expertName: expert.name, status: 'Pending' }
    ], { session });

    await session.commitTransaction();
    io.to(`expert:${payload.expertId}`).emit('slotBooked', {
      expertId: payload.expertId,
      date: payload.date,
      timeSlot: payload.timeSlot
    });

    return res.status(201).json(booking[0]);
  } catch (error: any) {
    await session.abortTransaction();
    if (error?.code === 11000) {
      return res.status(409).json({ message: 'This slot is already booked.' });
    }
    return res.status(500).json({ message: 'Failed to create booking' });
  } finally {
    session.endSession();
  }
};

export const updateBookingStatus = async (req: Request, res: Response) => {
  const statusSchema = z.object({ status: z.enum(['Pending', 'Confirmed', 'Completed']) });
  const parsed = statusSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ message: 'Invalid status' });

  const booking = await Booking.findByIdAndUpdate(req.params.id, parsed.data, { new: true });
  if (!booking) return res.status(404).json({ message: 'Booking not found' });

  return res.json(booking);
};

export const getBookings = async (req: Request, res: Response) => {
  const email = String(req.query.email || '').trim();
  if (!email) return res.status(400).json({ message: 'email query is required' });

  const bookings = await Booking.find({ email }).sort({ createdAt: -1 });
  return res.json(bookings);
};
