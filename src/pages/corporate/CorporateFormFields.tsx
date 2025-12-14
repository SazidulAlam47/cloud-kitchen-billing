import { useEffect } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import type { CorporateBill } from '../../types';
import { amountInWords } from '../../utils/formatters';
import BillBasicInfo from '../../components/billing/BillBasicInfo';
import BillItemsList from '../../components/billing/BillItemsList';
import BillTotals from '../../components/billing/BillTotals';
import FormHeader from '../../components/form/FormHeader';

interface CorporateFormFieldsProps {
    isEditing: boolean;
    onCancel: () => void;
}

const CorporateFormFields = ({ isEditing, onCancel }: CorporateFormFieldsProps) => {
    const { control, setValue } = useFormContext<CorporateBill>();
    const items = useWatch({ control, name: 'items' });

    // Calculate totals whenever items change
    useEffect(() => {
        const total = items?.reduce((sum, item) => {
            const lineTotal = (Number(item.persons) || 0) * (Number(item.unitPrice) || 0);
            return sum + lineTotal;
        }, 0) || 0;

        setValue('totalAmount', total);
        setValue('amountInWords', amountInWords(total));
    }, [items, setValue]);

    return (
        <div className="space-y-8">
            <FormHeader
                title={isEditing ? 'Edit Corporate Bill' : 'Create Corporate Bill'}
                onCancel={onCancel}
                isSaveDisabled={items?.length === 0}
            />

            <BillBasicInfo type="corporate" />

            <div className="space-y-0 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <BillItemsList type="corporate" />
                <BillTotals />
            </div>
        </div>
    );
};

export default CorporateFormFields;
