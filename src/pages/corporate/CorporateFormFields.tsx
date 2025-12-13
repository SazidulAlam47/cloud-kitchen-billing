import { useEffect } from 'react';
import { useFormContext, useFieldArray, useWatch } from 'react-hook-form';
import { Plus, Trash2, Save, ArrowLeft } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { Button } from '../../components/ui/Button';
import UInput from '../../components/form/UInput';
import type { CorporateBill } from '../../types';
import { amountInWords, formatCurrency } from '../../utils/formatters';
import { DEFAULT_CORPORATE_ITEM } from '../../constant';

interface CorporateFormFieldsProps {
    isEditing: boolean;
    onCancel: () => void;
}

const CorporateFormFields = ({ isEditing, onCancel }: CorporateFormFieldsProps) => {
    const { control, setValue } = useFormContext<CorporateBill>();
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'items',
    });
    
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

            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <UInput name="corporateName" label="Corporate Name" />
                <UInput name="contactPerson" label="Contact Person" />
                <UInput name="contactNo" label="Contact No" />
                <UInput name="date" label="Billing Date" type="date" />
            </div>

            {/* Line Items */}
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

                            {fields.map((field, index) => {
                                const item = items[index];
                                const lineTotal = (Number(item?.persons) || 0) * (Number(item?.unitPrice) || 0);

                                return (
                                    <div key={field.id} className="grid grid-cols-12 gap-4 items-start bg-gray-50/50 p-3 rounded-lg border border-gray-100 group hover:border-gray-300 transition-all">
                                        <div className="col-span-3">
                                            <UInput name={`items.${index}.date`} type="date" className="bg-white" />
                                        </div>
                                        <div className="col-span-3">
                                            <UInput name={`items.${index}.packageType`} placeholder="Package Type" className="bg-white" />
                                        </div>
                                        <div className="col-span-2">
                                            <UInput name={`items.${index}.persons`} type="number" min="0" className="text-right bg-white" />
                                        </div>
                                        <div className="col-span-2 relative">
                                            <UInput name={`items.${index}.unitPrice`} type="number" min="0" className="text-right bg-white" />
                                            <button
                                                type="button"
                                                onClick={() => remove(index)}
                                                className="absolute -right-8 top-5 -translate-y-1/2 p-1.5 text-gray-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                                                title="Remove Item"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                        <div className="col-span-2 flex h-10 items-center justify-end font-medium text-gray-900 pr-3">
                                            {formatCurrency(lineTotal)}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* Footer Totals */}
                <div className="bg-gray-50 p-6 border-t border-gray-200">
                    <div className="flex flex-col items-end gap-2">
                        <div className="flex justify-between w-full max-w-md text-lg">
                            <span className="text-gray-600">Total Amount:</span>
                            <span className="font-bold text-gray-900">{formatCurrency(useWatch({ control, name: 'totalAmount' }) || 0)}</span>
                        </div>
                        <div className="w-full max-w-md border-t border-gray-200 pt-2 text-right">
                            <span className="text-sm text-gray-500 italic block">In words:</span>
                            <span className="font-medium text-gray-800">{useWatch({ control, name: 'amountInWords' })}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CorporateFormFields;
