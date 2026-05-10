import mongoose, { Schema, Document } from 'mongoose';
import { BookingStatus } from '../types';

export interface IBooking extends Document {
  expertId: mongoose.Types.ObjectId;
  expertName: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  timeSlot: string;
  notes?: string;
  status: BookingStatus;
}

const BookingSchema = new Schema<IBooking>(
  {
    expertId: { type: Schema.Types.ObjectId, ref: 'Expert', required: true },
    expertName: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true, index: true },
    phone: { type: String, required: true },
    date: { type: String, required: true },
    timeSlot: { type: String, required: true },
    notes: { type: String },
    status: { type: String, enum: ['Pending', 'Confirmed', 'Completed'], default: 'Pending' }
  },
  { timestamps: true }
);

BookingSchema.index({ expertId: 1, date: 1, timeSlot: 1 }, { unique: true });

export const Booking = mongoose.model<IBooking>('Booking', BookingSchema);
