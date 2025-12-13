import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../redux/hooks';
import { addCorporateBill } from '../../redux/features/billing/billingSlice';
import CorporateForm from './CorporateForm';
import type { CorporateBill } from '../../types';

const CreateCorporate = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = (data: CorporateBill) => {
    dispatch(addCorporateBill(data));
    navigate('/');
  };

  return <CorporateForm onSubmit={handleSubmit} />;
};

export default CreateCorporate;
