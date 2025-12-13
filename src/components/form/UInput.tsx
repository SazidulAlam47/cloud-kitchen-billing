import { Controller } from 'react-hook-form';
import UFormError from './UFormError';

type UInputProps = {
    type?: string;
    placeholder?: string;
    name: string;
    label?: string;
    disabled?: boolean;
    readonly?: boolean;
    min?: string | number;
    className?: string; // Allow passing standard classNames
};

const UInput = ({
    type = 'text',
    placeholder,
    name,
    label,
    disabled = false,
    readonly = false,
    min,
    className
}: UInputProps) => {
    return (
        <div className={className} style={{ marginBottom: '12px' }}>
            <Controller
                name={name}
                render={({ field, fieldState: { error } }) => (
                    <div>
                        {label && <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}
                        <input
                             {...field}
                            type={type}
                            id={name}
                            placeholder={placeholder}
                            disabled={disabled}
                            readOnly={readonly}
                            min={min}
                            className={`flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 ${error ? 'border-red-500 focus:ring-red-500' : ''}`}
                        />
                        <UFormError error={error} />
                    </div>
                )}
            />
        </div>
    );
};

export default UInput;
