import { useFormContext, useWatch } from 'react-hook-form';
import { formatCurrency } from '../../utils/formatters';

const BillTotals = () => {
    const { control } = useFormContext();
    const totalAmount = useWatch({ control, name: 'totalAmount' }) || 0;
    const amountInWords = useWatch({ control, name: 'amountInWords' });

    return (
        <div className="bg-gray-50 p-6 border-t border-gray-200">
            <div className="flex flex-col items-end gap-2">
                <div className="flex justify-between w-full max-w-md text-lg">
                    <span className="text-gray-600">Total Amount:</span>
                    <span className="font-bold text-gray-900">{formatCurrency(totalAmount)}</span>
                </div>
                <div className="w-full max-w-md border-t border-gray-200 pt-2 text-right">
                    <span className="text-sm text-gray-500 italic block">In words:</span>
                    <span className="font-medium text-gray-800">{amountInWords}</span>
                </div>
            </div>
        </div>
    );
};

export default BillTotals;
