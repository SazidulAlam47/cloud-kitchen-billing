import toast from 'react-hot-toast';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { updateCorporateBill } from '../../redux/features/billing/billingSlice';
import CorporateForm from './CorporateForm';
import type { CorporateBill } from '../../types';

const EditCorporate = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const bills = useAppSelector((state) => state.billing.corporateBills);
  const [bill, setBill] = useState<CorporateBill | null>(null);

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

  const handleSubmit = (data: CorporateBill) => {
    dispatch(updateCorporateBill(data));
    toast.success('Bill updated successfully');
    navigate('/');
  };

  if (!bill) return <div>Loading...</div>;

  return (
    <div className="h-full overflow-y-auto">
      <CorporateForm initialData={bill} onSubmit={handleSubmit} isEditing />
    </div>
  );
};

export default EditCorporate;
