import { useEffect } from 'react';
import { useForm, useFieldArray, useWatch } from 'react-hook-form';
import { Plus, Trash2, Save, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import type { EventBill } from '../../types';
import { amountInWords, formatCurrency } from '../../utils/formatters';

interface EventFormProps {
  initialData?: EventBill;
  onSubmit: (data: EventBill) => void;
  isEditing?: boolean;
}

export function EventForm({ initialData, onSubmit, isEditing = false }: EventFormProps) {
  const navigate = useNavigate();

  const { register, control, handleSubmit, setValue, formState: { errors } } = useForm<EventBill>({
    defaultValues: initialData || {
      id: uuidv4(),
      type: 'Event',
      eventName: '',
      contactPerson: '',
      contactNo: '',
      date: new Date().toISOString().split('T')[0],
      items: [],
      totalAmount: 0,
      amountInWords: 'Zero Only',
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items',
  });

  const items = useWatch({ control, name: 'items' });

  // Calculate totals
  useEffect(() => {
    const total = items?.reduce((sum, item) => {
      const lineTotal = (Number(item.persons) || 0) * (Number(item.unitPrice) || 0);
      return sum + lineTotal;
    }, 0) || 0;

    setValue('totalAmount', total);
    setValue('amountInWords', amountInWords(total));
  }, [items, setValue]);

  const onFormSubmit = (data: EventBill) => {
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button type="button" variant="secondary" onClick={() => navigate('/')} size="sm">
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

      {/* Basic Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <Input
          label="Event Name"
          {...register('eventName', { required: 'Event Name is required' })}
          error={errors.eventName?.message}
          required
        />
        <Input
          label="Contact Person"
          {...register('contactPerson', { required: 'Contact Person is required' })}
          error={errors.contactPerson?.message}
          required
        />
        <Input
          label="Contact No"
          {...register('contactNo', { required: 'Contact Number is required' })}
          error={errors.contactNo?.message}
          required
        />
        <Input
          type="date"
          label="Event Date"
          {...register('date', { required: 'Date is required' })}
          error={errors.date?.message}
          required
        />
      </div>

      {/* Line Items */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-gray-50">
          <h3 className="font-semibold text-gray-900">Package Items</h3>
          <Button
            type="button"
            size="sm"
            onClick={() => append({ id: uuidv4(), packageName: '', packageType: 'Standard', description: '', persons: 0, unitPrice: 0 })}
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
            <div className="space-y-6">
              {fields.map((field, index) => {
                 const item = items[index];
                 const lineTotal = (Number(item?.persons) || 0) * (Number(item?.unitPrice) || 0);

                 return (
                  <div key={field.id} className="bg-gray-50/50 p-4 rounded-lg border border-gray-100 group hover:border-gray-300 transition-all relative">
                     <button
                        type="button"
                        onClick={() => remove(index)}
                        className="absolute right-4 top-4 p-1.5 text-gray-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                        title="Remove Item"
                      >
                        <Trash2 className="w-4 h-4" />
                    </button>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <Input
                        label="Package Name"
                         placeholder="e.g. Package-1"
                        {...register(`items.${index}.packageName` as const, { required: "Required" })}
                        className="bg-white"
                      />
                      <Input
                         label="Package Type"
                         placeholder="e.g. Economy / Standard"
                        {...register(`items.${index}.packageType` as const, { required: "Required" })}
                        className="bg-white"
                      />
                    </div>
                    
                    <div className="mb-4">
                       <Input
                         label="Description"
                         placeholder="Description of food items..."
                        {...register(`items.${index}.description` as const)}
                        className="bg-white"
                      />
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4">
                       <Input
                        label="Persons"
                        type="number"
                        min="0"
                        className="text-right bg-white"
                        {...register(`items.${index}.persons` as const, { required: true, min: 1 })}
                      />
                      <Input
                        label="Unit Price"
                        type="number"
                        min="0"
                        className="text-right bg-white"
                        {...register(`items.${index}.unitPrice` as const, { required: true, min: 0 })}
                      />
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Total</label>
                        <div className="px-3 py-2 border border-gray-200 rounded-md bg-gray-100 text-right font-medium text-gray-900">
                          {formatCurrency(lineTotal)}
                        </div>
                      </div>
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
    </form>
  );
}
