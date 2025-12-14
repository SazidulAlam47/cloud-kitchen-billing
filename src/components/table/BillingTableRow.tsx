import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import { Button } from '../ui/Button';
import { TableCell, TableRow } from '../ui/Table';
import { formatCurrency } from '../../utils/formatters';
import type { CorporateBill, EventBill } from '../../types';

interface BillingTableRowProps {
    bill: CorporateBill | EventBill;
    index: number;
    activeTab: 'corporate' | 'event';
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
}

const BillingTableRow = ({ bill, index, activeTab, onEdit, onDelete }: BillingTableRowProps) => {
    return (
        <TableRow>
            <TableCell className="font-mono text-gray-500">#{index + 1}</TableCell>
            <TableCell>
                <div className="font-medium text-gray-900">
                    {activeTab === 'corporate'
                        ? (bill as CorporateBill).corporateName
                        : (bill as EventBill).eventName}
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
                        onClick={() => onEdit(bill.id)}
                        title="Edit"
                    >
                        <FiEdit2 className="w-4 h-4 text-blue-600" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onDelete(bill.id)}
                        title="Delete"
                    >
                        <FiTrash2 className="w-4 h-4 text-red-600" />
                    </Button>
                </div>
            </TableCell>
        </TableRow>
    );
};

export default BillingTableRow;
