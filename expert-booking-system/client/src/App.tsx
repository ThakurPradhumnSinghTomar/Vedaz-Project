import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import ExpertListPage from './pages/ExpertListPage';
import ExpertDetailPage from './pages/ExpertDetailPage';
import BookingPage from './pages/BookingPage';
import MyBookingsPage from './pages/MyBookingsPage';

export default function App() {
  return <BrowserRouter><Routes><Route path="/" element={<Layout />}><Route index element={<ExpertListPage />} /><Route path="experts/:id" element={<ExpertDetailPage />} /><Route path="experts/:id/book" element={<BookingPage />} /><Route path="my-bookings" element={<MyBookingsPage />} /><Route path="*" element={<Navigate to="/" replace />} /></Route></Routes></BrowserRouter>;
}
