import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { deleteCorporateBill, deleteEventBill } from '../redux/features/billing/billingSlice';
import BillingTable from '../components/table/BillingTable';
import BillingTabs from '../components/dashboard/BillingTabs';
import DashboardHeader from '../components/dashboard/DashboardHeader';
import EmptyState from '../components/dashboard/EmptyState';


const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [activeTab, setActiveTab] = useState<'corporate' | 'event'>('corporate');

  const corporateBills = useAppSelector((state) => state.billing.corporateBills);
  const eventBills = useAppSelector((state) => state.billing.eventBills);

  const bills = activeTab === 'corporate' ? corporateBills : eventBills;

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this bill? This action cannot be undone.')) {
      if (activeTab === 'corporate') {
        dispatch(deleteCorporateBill(id));
      } else {
        dispatch(deleteEventBill(id));
      }
    }
  };

  const handleEdit = (id: string) => {
    navigate(`/${activeTab}/edit/${id}`);
  };

  return (
    <div className="space-y-6">
      <DashboardHeader activeTab={activeTab} />

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <BillingTabs activeTab={activeTab} onChange={setActiveTab} />

        <div className="p-6">
          {bills.length === 0 ? (
            <EmptyState activeTab={activeTab} />
          ) : (
            <BillingTable
              bills={bills}
              activeTab={activeTab}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
