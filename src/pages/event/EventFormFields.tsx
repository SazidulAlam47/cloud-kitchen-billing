import { useEffect } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { ArrowLeft, Save } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import type { EventBill } from '../../types';
import { amountInWords } from '../../utils/formatters';
import EventBasicInfo from '../../components/event/EventBasicInfo';
import EventPackageList from '../../components/event/EventPackageList';
import EventTotals from '../../components/event/EventTotals';

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
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Button type="button" variant="secondary" onClick={onCancel} size="sm">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back
                    </Button>
                    <h1 className="text-2xl font-bold text-gray-900">
                        {isEditing ? 'Edit Event Bill' : 'Create Event Bill'}
                    </h1>
                </div>
                <Button type="submit" disabled={items?.length === 0} className="shadow-lg hover:shadow-xl">
                    <Save className="w-4 h-4 mr-2" />
                    Save Bill
                </Button>
            </div>

            <EventBasicInfo />

            <div className="space-y-0 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <EventPackageList />
                <EventTotals />
            </div>
        </div>
    );
};

export default EventFormFields;
