import 'dotenv/config';
import { connectDB } from '../config/db';
import { Expert } from '../models/Expert';

const experts = [
  { name: 'Dr. Sarah Mitchell', category: 'Career', experience: 10, rating: 4.8, bio: 'Career strategist.', availableSlots: [{ date: '2026-05-11', slots: ['09:00', '10:00', '14:00'] }] },
  { name: 'James Carter', category: 'Finance', experience: 8, rating: 4.7, bio: 'Financial advisor.', availableSlots: [{ date: '2026-05-11', slots: ['11:00', '12:00', '15:00'] }] },
  { name: 'Aisha Khan', category: 'Tech', experience: 6, rating: 4.9, bio: 'Engineering mentor.', availableSlots: [{ date: '2026-05-12', slots: ['09:30', '13:00', '16:00'] }] }
];

(async () => {
  await connectDB(process.env.MONGODB_URI || '');
  await Expert.deleteMany({});
  await Expert.insertMany(experts);
  console.log('Experts seeded');
  process.exit(0);
})();
