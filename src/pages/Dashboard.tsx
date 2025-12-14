import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
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
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      customClass: {
        popup: 'rounded-xl border border-gray-100 shadow-xl',
        confirmButton: 'bg-red-600 text-white px-5 py-2.5 rounded-lg hover:bg-red-700 focus:ring-4 focus:ring-red-100 font-medium transition-all transform hover:scale-[1.02]',
        cancelButton: 'bg-white text-gray-700 border border-gray-300 px-5 py-2.5 rounded-lg hover:bg-gray-50 focus:ring-4 focus:ring-gray-100 font-medium transition-all transform hover:scale-[1.02]',
        actions: 'flex gap-3 w-full justify-center'
      },
      buttonsStyling: false
    }).then((result) => {
      if (result.isConfirmed) {
        if (activeTab === 'corporate') {
          dispatch(deleteCorporateBill(id));
        } else {
          dispatch(deleteEventBill(id));
        }
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })
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
