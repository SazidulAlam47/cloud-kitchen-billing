import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import type { SubmitHandler } from 'react-hook-form';
import UForm from '../../components/form/UForm';
import { corporateBillSchema } from '../../schema/billingSchemas';
import type { CorporateBill } from '../../types';
import CorporateFormFields from './CorporateFormFields';
import { DEFAULT_CORPORATE_BILL_VALUES } from '../../constant';

interface CorporateFormProps {
  initialData?: CorporateBill;
  onSubmit: SubmitHandler<CorporateBill>;
  isEditing?: boolean;
}

const CorporateForm = ({ initialData, onSubmit, isEditing = false }: CorporateFormProps) => {
  const navigate = useNavigate();

  const defaultValues = initialData || {
      ...DEFAULT_CORPORATE_BILL_VALUES,
      id: uuidv4(),
      date: new Date().toISOString().split('T')[0],
  };

  const handleCancel = () => navigate('/');

  return (
    <UForm
        onSubmit={onSubmit}
        defaultValues={defaultValues as any}
        resolver={zodResolver(corporateBillSchema)}
    >
        <CorporateFormFields isEditing={isEditing} onCancel={handleCancel} />
    </UForm>
  );
};

export default CorporateForm;
