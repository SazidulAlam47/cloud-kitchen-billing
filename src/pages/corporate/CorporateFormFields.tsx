import { useEffect } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { ArrowLeft, Save } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import type { CorporateBill } from '../../types';
import { amountInWords } from '../../utils/formatters';
import CorporateBasicInfo from '../../components/corporate/CorporateBasicInfo';
import CorporatePackageList from '../../components/corporate/CorporatePackageList';
import CorporateTotals from '../../components/corporate/CorporateTotals';

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
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Button type="button" variant="secondary" onClick={onCancel} size="sm">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back
                    </Button>
                    <h1 className="text-2xl font-bold text-gray-900">
                        {isEditing ? 'Edit Corporate Bill' : 'Create Corporate Bill'}
                    </h1>
                </div>
                <Button type="submit" disabled={items?.length === 0} className="shadow-lg hover:shadow-xl">
                    <Save className="w-4 h-4 mr-2" />
                    Save Bill
                </Button>
            </div>

            <CorporateBasicInfo />

            <div className="space-y-0 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <CorporatePackageList />
                <CorporateTotals />
            </div>
        </div>
    );
};

export default CorporateFormFields;
