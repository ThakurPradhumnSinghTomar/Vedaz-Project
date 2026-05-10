import { Router } from 'express';
import { createBooking, getBookings, updateBookingStatus } from '../controllers/bookingController';

const router = Router();
router.post('/', createBooking);
router.patch('/:id/status', updateBookingStatus);
router.get('/', getBookings);
export default router;
