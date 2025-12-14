import { useFormContext } from 'react-hook-form';
import { Trash2 } from 'lucide-react';
import UInput from '../form/UInput';
import USelect from '../form/USelect';
import { PACKAGE_TYPES } from '../../data/chefData';
import { formatCurrency } from '../../utils/formatters';

interface BillItemRowProps {
    index: number;
    onRemove: () => void;
    item: any;
    type: 'corporate' | 'event';
}

const BillItemRow = ({ index, onRemove, item, type }: BillItemRowProps) => {
    const { setValue } = useFormContext();
    const lineTotal = (Number(item?.persons) || 0) * (Number(item?.unitPrice) || 0);
    const isCorporate = type === 'corporate';

    return (
        <div className="grid grid-cols-[3fr,3fr,1fr,1.5fr,1.5fr,0.5fr] gap-4 items-start bg-gray-50/50 p-3 rounded-lg border border-gray-100 group hover:border-gray-300 transition-all min-w-[800px]">
            <div className="space-y-2">
                {isCorporate ? (
                    <UInput name={`items.${index}.date`} type="date" className="bg-white" />
                ) : (
                    <UInput name={`items.${index}.packageName`} placeholder="Package Name" className="bg-white" />
                )}
            </div>
            <div className="space-y-2">
                <USelect
                    name={`items.${index}.packageType`}
                    placeholder="Type"
                    options={PACKAGE_TYPES.map(p => ({ label: p.name, value: p.name }))}
                    className="bg-white mb-1"
                    onChange={(val) => {
                        const pkg = PACKAGE_TYPES.find(p => p.name === val);
                        if (pkg) {
                            setValue(`items.${index}.unitPrice`, pkg.defaultUnitPrice);
                        }
                    }}
                />
                {!isCorporate && (
                    <UInput name={`items.${index}.description`} placeholder="Description" className="bg-white text-xs" />
                )}
            </div>
            <div>
                <UInput name={`items.${index}.persons`} type="number" min="0" className="text-right bg-white" />
            </div>
            <div>
                <UInput name={`items.${index}.unitPrice`} type="number" min="0" className="text-right bg-white" />
            </div>
            <div className="flex h-10 items-center justify-end font-medium text-gray-900 pr-3">
                {formatCurrency(lineTotal)}
            </div>
            <div className="flex h-10 items-center justify-center">
                <button
                    type="button"
                    onClick={onRemove}
                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-all"
                    title="Remove Item"
                >
                    <Trash2 className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
};

export default BillItemRow;
