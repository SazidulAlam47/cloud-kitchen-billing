import { useFormContext, useFieldArray, useWatch } from 'react-hook-form';
import { Plus } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { Button } from '../ui/Button';
import EventPackageItem from './EventPackageItem';
import { DEFAULT_EVENT_ITEM } from '../../constant';
import type { EventBill } from '../../types';

const EventPackageList = () => {
    const { control } = useFormContext<EventBill>();
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'items',
    });
    
    const items = useWatch({ control, name: 'items' });

    return (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-gray-50">
                <h3 className="font-semibold text-gray-900">Packages</h3>
                <Button
                    type="button"
                    size="sm"
                    onClick={() => append({ id: uuidv4(), ...DEFAULT_EVENT_ITEM })}
                >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Package
                </Button>
            </div>

            <div className="p-4">
                {fields.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                        No packages added. Click "Add Package" to start.
                    </div>
                ) : (
                    <div className="space-y-4">
                        <div className="grid grid-cols-12 gap-4 font-medium text-sm text-gray-500 px-2">
                            <div className="col-span-3">Package Name</div>
                            <div className="col-span-3">Details (Type/Desc)</div>
                            <div className="col-span-2 text-right">Persons</div>
                            <div className="col-span-2 text-right">Unit Price</div>
                            <div className="col-span-2 text-right">Total</div>
                        </div>

                        {fields.map((field, index) => (
                            <EventPackageItem
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

export default EventPackageList;
