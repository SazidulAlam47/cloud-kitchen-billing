import toast from 'react-hot-toast';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { updateEventBill } from '../../redux/features/billing/billingSlice';
import EventForm from './EventForm';
import type { EventBill } from '../../types';

const EditEvent = () => {
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
        navigate('/');
      }
    }
  }, [id, bills, navigate]);

  const handleSubmit = (data: EventBill) => {
    dispatch(updateEventBill(data));
    toast.success('Event bill updated successfully');
    navigate('/');
  };

  if (!bill) return <div>Loading...</div>;

  return (
    <div className="h-full overflow-y-auto">
      <EventForm initialData={bill} onSubmit={handleSubmit} isEditing />
    </div>
  );
};

export default EditEvent;
