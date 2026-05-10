import 'dotenv/config';
import { connectDB } from '../config/db';
import { Expert } from '../models/Expert';

const categories = ['Career', 'Finance', 'Tech', 'Health', 'Legal'];
const firstNames = ['Alex', 'Jordan', 'Taylor', 'Morgan', 'Sam', 'Riley', 'Casey', 'Avery', 'Cameron', 'Reese'];
const lastNames = ['Smith', 'Johnson', 'Brown', 'Davis', 'Miller', 'Wilson', 'Moore', 'Clark', 'Lewis', 'Walker'];

const buildSlots = (offset: number) => {
  const date = new Date();
  date.setDate(date.getDate() + (offset % 10) + 1);
  const dateStr = date.toISOString().slice(0, 10);
  return {
    date: dateStr,
    slots: ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00']
  };
};

const experts = Array.from({ length: 100 }, (_, i) => {
  const first = firstNames[i % firstNames.length];
  const last = lastNames[Math.floor(i / firstNames.length) % lastNames.length];
  const category = categories[i % categories.length];

  return {
    name: `${first} ${last}`,
    category,
    experience: 3 + (i % 18),
    rating: Number((4 + ((i % 10) * 0.1)).toFixed(1)),
    bio: `${category} expert with practical consulting experience.`,
    availableSlots: [buildSlots(i), buildSlots(i + 1), buildSlots(i + 2)]
  };
});

(async () => {
  await connectDB(process.env.MONGODB_URI || '');
  await Expert.deleteMany({});
  await Expert.insertMany(experts);
  console.log(`Experts seeded: ${experts.length}`);
  process.exit(0);
})();
