import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { deleteCorporateBill, deleteEventBill } from '../redux/features/billing/billingSlice';
import { Button } from '../components/ui/Button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/Table';
import { formatCurrency } from '../utils/formatters';
import { cn } from '../utils/cn';

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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500 mt-1">Manage all your billing records in one place.</p>
        </div>
        <Button onClick={() => navigate(`/${activeTab}/create`)} className="gap-2 shadow-lg hover:shadow-xl transition-all">
          <Plus className="w-4 h-4" />
          Create New {activeTab === 'corporate' ? 'Bill' : 'Event'}
        </Button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab('corporate')}
            className={cn(
              "flex-1 px-6 py-4 text-sm font-medium transition-colors text-center relative",
              activeTab === 'corporate' 
                ? "text-primary-600 bg-primary-50/50" 
                : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"
            )}
          >
            Corporate Billing
            {activeTab === 'corporate' && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary-600" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('event')}
            className={cn(
              "flex-1 px-6 py-4 text-sm font-medium transition-colors text-center relative",
              activeTab === 'event' 
                ? "text-primary-600 bg-primary-50/50" 
                : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"
            )}
          >
            Event Billing
            {activeTab === 'event' && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary-600" />
            )}
          </button>
        </div>

        <div className="p-6">
          {bills.length === 0 ? (
            <div className="text-center py-12">
              <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileTextOrCalendar activeTab={activeTab} className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900">No bills found</h3>
              <p className="text-gray-500 mt-1">Get started by creating a new {activeTab} bill.</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>No.</TableHead>
                  <TableHead>Bill Name</TableHead>
                  <TableHead>Contact Person</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Total Amount</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bills.map((bill, index) => (
                  <TableRow key={bill.id}>
                    <TableCell className="font-mono text-gray-500">#{index + 1}</TableCell>
                    <TableCell>
                      <div className="font-medium text-gray-900">
                        {activeTab === 'corporate' 
                          ? (bill as any).corporateName 
                          : (bill as any).eventName}
                      </div>
                      <div className="text-xs text-gray-500 capitalize">{bill.type}</div>
                    </TableCell>
                    <TableCell>
                      <div>{bill.contactPerson}</div>
                      <div className="text-xs text-gray-500">{bill.contactNo}</div>
                    </TableCell>
                    <TableCell className="text-gray-500">{new Date(bill.date).toLocaleDateString()}</TableCell>
                    <TableCell className="text-right font-medium">
                      {formatCurrency(bill.totalAmount)}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleEdit(bill.id)}
                          title="Edit"
                        >
                          <Edit2 className="w-4 h-4 text-blue-600" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleDelete(bill.id)}
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </div>
    </div>
  );
};

function FileTextOrCalendar({ activeTab, className }: { activeTab: string, className?: string }) {
  if (activeTab === 'corporate') {
    return (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    )
  }
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  )
}

export default Dashboard;
