import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type ReviewStatus = 'new' | 'replied';
export type ReviewSource = 'qr' | 'web' | 'staff';

export interface Review {
  id: string;
  branch: string;
  table?: string;
  orderId?: string;
  source: ReviewSource;
  rating: number;
  tags: string[];
  comment?: string;
  name?: string;
  phone?: string;
  status: ReviewStatus;
  createdAt: string;
  reply?: string;
}

type ReviewStoreState = {
  reviews: Review[];
  addReview: (review: Omit<Review, 'id' | 'status' | 'createdAt'>) => void;
  replyToReview: (id: string, reply: string) => void;
};

const MOCK_REVIEWS: Review[] = [
  { id: 'rev-1', branch: '1', orderId: '7S-8801', source: 'web', rating: 5, tags: ['Tasty', 'Fast service'], comment: 'Best tenders in Lahore!', name: 'Ali', status: 'replied', createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), reply: 'Thank you Ali!' },
  { id: 'rev-2', branch: '2', table: '4', source: 'qr', rating: 4, tags: ['Clean', 'Value for money'], comment: 'Bohat acha tha, portion size is great.', name: 'Sara', status: 'new', createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString() },
  { id: 'rev-3', branch: '3', source: 'staff', rating: 5, tags: ['Tasty', 'Fast service'], comment: 'Loved the comeback sauce.', status: 'new', createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString() },
  { id: 'rev-4', branch: '4', orderId: '7S-8755', source: 'web', rating: 2, tags: ['Slow', 'Cold food'], comment: 'Delivery bohat late ayi aur khana thanda tha.', name: 'Ahmed', phone: '03001234567', status: 'new', createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString() },
  { id: 'rev-5', branch: '1', table: '12', source: 'qr', rating: 5, tags: ['Tasty', 'Clean'], comment: 'Maza aa gaya!', status: 'replied', createdAt: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(), reply: 'Glad you liked it!' },
  { id: 'rev-6', branch: '2', source: 'staff', rating: 4, tags: ['Fast service'], comment: '', status: 'new', createdAt: new Date(Date.now() - 1000 * 60 * 60 * 1).toISOString() },
  { id: 'rev-7', branch: '3', table: '2', source: 'qr', rating: 3, tags: ['Value for money'], comment: 'Fries were a bit soggy but chicken was good.', name: 'Zainab', status: 'new', createdAt: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString() },
  { id: 'rev-8', branch: '4', orderId: '7S-8822', source: 'web', rating: 5, tags: ['Tasty', 'Value for money'], comment: 'The waffle fries are unmatched.', status: 'new', createdAt: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString() },
  { id: 'rev-9', branch: '1', source: 'staff', rating: 5, tags: ['Clean', 'Fast service'], comment: 'Staff was very polite.', name: 'Usman', status: 'replied', createdAt: new Date(Date.now() - 1000 * 60 * 60 * 15).toISOString(), reply: 'We appreciate your feedback Usman!' },
  { id: 'rev-10', branch: '2', orderId: '7S-8811', source: 'web', rating: 1, tags: ['Cold food', 'Slow'], comment: 'Worst experience. Order hi wrong deliver kiya.', phone: '03339876543', status: 'new', createdAt: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString() },
  { id: 'rev-11', branch: '3', source: 'staff', rating: 4, tags: ['Tasty'], comment: 'Zabardast taste.', status: 'new', createdAt: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString() },
  { id: 'rev-12', branch: '4', table: '7', source: 'qr', rating: 5, tags: ['Tasty', 'Fast service', 'Clean'], comment: '', name: 'Bilal', status: 'new', createdAt: new Date(Date.now() - 1000 * 60 * 60 * 9).toISOString() },
  { id: 'rev-13', branch: '1', orderId: '7S-8899', source: 'web', rating: 5, tags: ['Value for money'], comment: 'Very filling sliders.', status: 'new', createdAt: new Date(Date.now() - 1000 * 60 * 60 * 18).toISOString() },
  { id: 'rev-14', branch: '2', table: '1', source: 'qr', rating: 4, tags: ['Tasty'], comment: 'Nice ambiance too.', status: 'new', createdAt: new Date(Date.now() - 1000 * 60 * 60 * 20).toISOString() },
  { id: 'rev-15', branch: '3', orderId: '7S-8910', source: 'web', rating: 2, tags: ['Slow'], comment: 'Took 1.5 hours to deliver. Not happy.', status: 'replied', createdAt: new Date(Date.now() - 1000 * 60 * 60 * 50).toISOString(), reply: 'We sincerely apologize for the delay. Please check your inbox for a voucher.' },
];

export const useReviewStore = create<ReviewStoreState>()(
  persist(
    (set) => ({
      reviews: MOCK_REVIEWS,
      addReview: (review) => set((state) => ({
        reviews: [
          {
            ...review,
            id: `rev-${Date.now()}`,
            status: 'new',
            createdAt: new Date().toISOString(),
          },
          ...state.reviews
        ]
      })),
      replyToReview: (id, reply) => set((state) => ({
        reviews: state.reviews.map(r => r.id === id ? { ...r, reply, status: 'replied' } : r)
      }))
    }),
    {
      name: 'sevensides-reviews',
    }
  )
);
