import mongoose, { Schema, Document } from 'mongoose';

export interface ITimeSlot {
  date: string;
  slots: string[];
}

export interface IExpert extends Document {
  name: string;
  category: string;
  experience: number;
  rating: number;
  bio: string;
  availableSlots: ITimeSlot[];
}

const TimeSlotSchema = new Schema<ITimeSlot>(
  {
    date: { type: String, required: true },
    slots: [{ type: String, required: true }]
  },
  { _id: false }
);

const ExpertSchema = new Schema<IExpert>(
  {
    name: { type: String, required: true },
    category: { type: String, required: true, index: true },
    experience: { type: Number, required: true },
    rating: { type: Number, required: true },
    bio: { type: String, required: true },
    availableSlots: [TimeSlotSchema]
  },
  { timestamps: true }
);

export const Expert = mongoose.model<IExpert>('Expert', ExpertSchema);
