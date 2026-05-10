import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import http from 'http';
import expertRoutes from './routes/expertRoutes';
import bookingRoutes from './routes/bookingRoutes';
import { connectDB } from './config/db';
import { errorHandler, notFoundHandler } from './middleware/errorHandler';
import { initSocket } from './socket';

const app = express();
const server = http.createServer(app);

const PORT = Number(process.env.PORT || 5000);
const MONGODB_URI = process.env.MONGODB_URI || '';
const CLIENT_URL = process.env.CLIENT_URL || "https://vedaz-project-2.onrender.com/";

app.use(helmet());
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}));
app.use(express.json());
app.use(morgan('dev'));

app.get('/health', (_req, res) => res.json({ status: 'ok' }));
app.use('/experts', expertRoutes);
app.use('/bookings', bookingRoutes);
app.use(notFoundHandler);
app.use(errorHandler);

connectDB(MONGODB_URI)
  .then(() => {
    initSocket(server, CLIENT_URL);
    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect DB', err);
    process.exit(1);
  });
