import { useFormContext, useFieldArray, useWatch } from 'react-hook-form';
import { Plus } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { Button } from '../ui/Button';
import BillItemRow from './BillItemRow';
import { DEFAULT_CORPORATE_ITEM, DEFAULT_EVENT_ITEM } from '../../constant';

interface BillItemsListProps {
    type: 'corporate' | 'event';
}

const BillItemsList = ({ type }: BillItemsListProps) => {
    const { control } = useFormContext();
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'items',
    });
    
    const items = useWatch({ control, name: 'items' });
    const isCorporate = type === 'corporate';

    const handleAdd = () => {
        const defaultItem = isCorporate 
            ? { id: uuidv4(), date: new Date().toISOString().split('T')[0], ...DEFAULT_CORPORATE_ITEM }
            : { id: uuidv4(), ...DEFAULT_EVENT_ITEM };
        
        append(defaultItem);
    };

    return (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-gray-50">
                <h3 className="font-semibold text-gray-900">
                    {isCorporate ? "Billing Items" : "Packages"}
                </h3>
                <Button
                    type="button"
                    size="sm"
                    onClick={handleAdd}
                >
                    <Plus className="w-4 h-4 mr-2" />
                    {isCorporate ? "Add Row" : "Add Package"}
                </Button>
            </div>

            <div className="p-4">
                {fields.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                        {isCorporate ? 'No items added. Click "Add Row" to start.' : 'No packages added. Click "Add Package" to start.'}
                    </div>
                ) : (
                    <div className="space-y-4 overflow-x-auto pb-4">
                        <div className="grid grid-cols-[3fr,3fr,1fr,1.5fr,1.5fr,0.5fr] gap-4 font-medium text-sm text-gray-500 px-2 min-w-[800px]">
                            <div>
                                {isCorporate ? "Service Date" : "Package Name"}
                            </div>
                            <div>
                                {isCorporate ? "Package" : "Details (Type/Desc)"}
                            </div>
                            <div className="text-right">Persons</div>
                            <div className="text-right">Unit Price</div>
                            <div className="text-right">Total</div>
                            <div className="text-center"></div>
                        </div>

                        {fields.map((field, index) => (
                            <BillItemRow
                                key={field.id}
                                index={index}
                                onRemove={() => remove(index)}
                                item={items[index]}
                                type={type}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default BillItemsList;
