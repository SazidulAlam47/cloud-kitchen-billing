import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { updateEventBill } from '../../redux/features/billing/billingSlice';
import { EventForm } from './EventForm';
import type { EventBill } from '../../types';

export function EditEvent() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const bills = useAppSelector((state) => state.billing.eventBills);
  const [bill, setBill] = useState<EventBill | null>(null);

  useEffect(() => {
    if (id) {
      const found = bills.find((b) => b.id === id);
      if (found) {
        setBill(found);
      } else {
        navigate('/'); // Redirect if not found
      }
    }
  }, [id, bills, navigate]);

  const handleSubmit = (data: EventBill) => {
    dispatch(updateEventBill(data));
    navigate('/');
  };

  if (!bill) return <div>Loading...</div>;

  return <EventForm initialData={bill} onSubmit={handleSubmit} isEditing />;
}
