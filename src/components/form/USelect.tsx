import { Controller } from 'react-hook-form';
import UFormError from './UFormError';
import { cn } from '../../utils/cn';

type Option = {
    label: string;
    value: string | number;
};

type USelectProps = {
    name: string;
    label?: string;
    options: Option[];
    placeholder?: string;
    className?: string;
    disabled?: boolean;
    onChange?: (value: string | number) => void; 
};

const USelect = ({ name, label, options, placeholder, className, disabled, onChange }: USelectProps) => {
    return (
        <Controller
            name={name}
            render={({ field, fieldState: { error } }) => (
                <div className="w-full">
                    {label && (
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            {label}
                        </label>
                    )}
                    <select
                        {...field}
                        disabled={disabled}
                        onChange={(e) => {
                            field.onChange(e);
                            if (onChange) onChange(e.target.value);
                        }}
                        className={cn(
                            "flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50",
                            error ? 'border-red-500 focus:ring-red-500' : '',
                            className
                        )}
                    >
                        {placeholder && <option value="">{placeholder}</option>}
                        {options.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                                {opt.label}
                            </option>
                        ))}
                    </select>
                    <UFormError error={error} />
                </div>
            )}
        />
    );
};

export default USelect;
