import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../redux/hooks';
import { addEventBill } from '../../redux/features/billing/billingSlice';
import { EventForm } from './EventForm';
import type { EventBill } from '../../types';

export function CreateEvent() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = (data: EventBill) => {
    dispatch(addEventBill(data));
    navigate('/');
  };

  return <EventForm onSubmit={handleSubmit} />;
}
