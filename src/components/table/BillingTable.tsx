import { Table, TableBody, TableHead, TableHeader, TableRow } from '../ui/Table';
import BillingTableRow from './BillingTableRow';
import type { CorporateBill, EventBill } from '../../types';

interface BillingTableProps {
    bills: (CorporateBill | EventBill)[];
    activeTab: 'corporate' | 'event';
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
}

const BillingTable = ({ bills, activeTab, onEdit, onDelete }: BillingTableProps) => {
    return (
        <Table className="min-w-[1000px]">
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
                    <BillingTableRow
                        key={bill.id}
                        bill={bill}
                        index={index}
                        activeTab={activeTab}
                        onEdit={onEdit}
                        onDelete={onDelete}
                    />
                ))}
            </TableBody>
        </Table>
    );
};

export default BillingTable;
