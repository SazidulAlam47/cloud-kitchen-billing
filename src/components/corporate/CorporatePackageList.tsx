import { useFormContext, useFieldArray, useWatch } from 'react-hook-form';
import { Plus } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { Button } from '../ui/Button';
import CorporatePackageItem from './CorporatePackageItem';
import { DEFAULT_CORPORATE_ITEM } from '../../constant';
import type { CorporateBill } from '../../types';

const CorporatePackageList = () => {
    const { control } = useFormContext<CorporateBill>();
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'items',
    });
    
    const items = useWatch({ control, name: 'items' });

    return (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-gray-50">
                <h3 className="font-semibold text-gray-900">Billing Items</h3>
                <Button
                    type="button"
                    size="sm"
                    onClick={() => append({ id: uuidv4(), date: new Date().toISOString().split('T')[0], ...DEFAULT_CORPORATE_ITEM })}
                >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Row
                </Button>
            </div>

            <div className="p-4">
                {fields.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                        No items added. Click "Add Row" to start.
                    </div>
                ) : (
                    <div className="space-y-4">
                        <div className="grid grid-cols-12 gap-4 font-medium text-sm text-gray-500 px-2">
                            <div className="col-span-3">Service Date</div>
                            <div className="col-span-3">Package</div>
                            <div className="col-span-2 text-right">Persons</div>
                            <div className="col-span-2 text-right">Unit Price</div>
                            <div className="col-span-2 text-right">Total</div>
                        </div>

                        {fields.map((field, index) => (
                            <CorporatePackageItem
                                key={field.id}
                                index={index}
                                onRemove={() => remove(index)}
                                items={items}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CorporatePackageList;
