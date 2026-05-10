export interface Expert { _id: string; name: string; category: string; experience: number; rating: number; bio: string; availableSlots: { date: string; slots: string[] }[]; }
export interface Booking { _id: string; expertName: string; name: string; email: string; phone: string; date: string; timeSlot: string; notes?: string; status: 'Pending' | 'Confirmed' | 'Completed'; }
