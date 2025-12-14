import { useEffect } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import type { EventBill } from '../../types';
import { amountInWords } from '../../utils/formatters';
import BillBasicInfo from '../../components/billing/BillBasicInfo';
import BillItemsList from '../../components/billing/BillItemsList';
import BillTotals from '../../components/billing/BillTotals';
import FormHeader from '../../components/shared/FormHeader';

interface EventFormFieldsProps {
    isEditing: boolean;
    onCancel: () => void;
}

const EventFormFields = ({ isEditing, onCancel }: EventFormFieldsProps) => {
    const { control, setValue } = useFormContext<EventBill>();
    const items = useWatch({ control, name: 'items' });

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
                title={isEditing ? 'Edit Event Bill' : 'Create Event Bill'}
                onCancel={onCancel}
                isSaveDisabled={items?.length === 0}
            />

            <BillBasicInfo type="event" />

            <div className="space-y-0 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <BillItemsList type="event" />
                <BillTotals />
            </div>
        </div>
    );
};

export default EventFormFields;
