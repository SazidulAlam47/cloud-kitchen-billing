import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../redux/hooks';
import { addEventBill } from '../../redux/features/billing/billingSlice';
import EventForm from './EventForm';
import type { EventBill } from '../../types';

const CreateEvent = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = (data: EventBill) => {
    dispatch(addEventBill(data));
    toast.success('Event bill saved successfully');
    navigate('/');
  };

  return (
    <div className="h-full overflow-y-auto">
      <EventForm onSubmit={handleSubmit} />
    </div>
  );
};

export default CreateEvent;
