import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import type { SubmitHandler } from 'react-hook-form';
import UForm from '../../components/form/UForm';
import { eventBillSchema } from '../../schema/billingSchemas';
import type { EventBill } from '../../types';
import EventFormFields from './EventFormFields';

interface EventFormProps {
  initialData?: EventBill;
  onSubmit: SubmitHandler<EventBill>;
  isEditing?: boolean;
}

const EventForm = ({ initialData, onSubmit, isEditing = false }: EventFormProps) => {
  const navigate = useNavigate();

  const defaultValues = initialData || {
      id: uuidv4(),
      type: 'Event',
      eventName: '',
      contactPerson: '',
      contactNo: '',
      date: new Date().toISOString().split('T')[0],
      items: [],
      totalAmount: 0,
      amountInWords: 'Zero Only',
  };

  const handleCancel = () => navigate('/');

  return (
      <UForm
          onSubmit={onSubmit}
          defaultValues={defaultValues as any}
          resolver={zodResolver(eventBillSchema)}
      >
          <EventFormFields isEditing={isEditing} onCancel={handleCancel} />
      </UForm>
  );
};

export default EventForm;
