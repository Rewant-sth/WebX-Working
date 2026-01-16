import Select from "react-select";
import { Controller, UseFormRegister, Control, FieldError } from "react-hook-form";

// Re-export schemas from separate file
export { travelerSchema, formSchema } from "./schemas";

// Reusable form components
interface FormInputProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    register: UseFormRegister<any>;
    name: string;
    label: string;
    error?: FieldError;
    icon?: React.ReactNode;
    type?: string;
    placeholder?: string;
    min?: string | number;
    required?: boolean;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const FormInput = ({
    register,
    name,
    label,
    error,
    icon,
    type = "text",
    placeholder,
    min,
    required = true,
    onChange
}: FormInputProps) => {
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // Only accept input if it's from a trusted user event

        if (onChange) {
            onChange(e);
        }
    };

    return (
        <div className="mb-4">
            <label className="block text-zinc-700 mb-1">
                {label} {required && "*"}
            </label>
            <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-zinc-400">
                    {icon}
                </div>
                <input
                    {...register(name, {
                        ...(type === "number" && {
                            valueAsNumber: true,
                        }),
                        onChange: handleInputChange
                    })}
                    min={min}
                    type={type}
                    placeholder={placeholder}
                    autoComplete="off"
                    data-form-type="other"
                    className="w-full pl-10 pr-3 py-2 border border-zinc-300 rounded-sm"
                />
            </div>
            {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
        </div>
    );
};

export interface FormDateInputProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    register: UseFormRegister<any>;
    name: string;
    label: string;
    error?: FieldError;
    min?: string;
    max?: string;
    required?: boolean;
    disabled?: boolean;
    asDateObject?: boolean; // New prop to control if value should be a Date object
}

export const FormDateInput = ({
    register,
    name,
    label,
    error,
    min,
    max,
    required = true,
    disabled = false,
    asDateObject = false, // Default to false (keep as string)
}: FormDateInputProps) => {
    return (
        <div className="mb-4 w-full">
            <label className="block text-zinc-700 mb-1">
                {label} {required && "*"}
            </label>
            <div className="relative w-full">
                <input
                    type="date"
                    {...register(name, asDateObject ? {
                        setValueAs: (value: string) => value ? new Date(value) : null,
                    } : {})}
                    min={min}
                    max={max}
                    disabled={disabled}
                    autoComplete="off"
                    data-form-type="other"
                    className={`w-full pl-10 pr-3 py-2 border border-zinc-300 rounded-sm ${disabled ? 'bg-zinc-100 cursor-not-allowed' : ''}`}
                />

            </div>
            {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
        </div>
    );
};

export interface FormSelectProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    control: Control<any>;
    name: string;
    label: string;
    error?: FieldError;
    icon?: React.ReactNode;
    options: Array<{ value: string; label: string }>;
    required?: boolean;
    placeholder?: string;
    isMulti?: boolean;
}

interface SelectOption {
    value: string;
    label: string;
}

export const FormSelect = ({
    control,
    name,
    label,
    error,
    icon,
    options,
    required = true,
    placeholder,
    isMulti = false
}: FormSelectProps) => {
    return (
        <div className="mb-4">
            <label className="block text-zinc-700 mb-1">
                {label} {required && "*"}
            </label>
            <div className="relative">
                {icon && (
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-zinc-400 z-10">
                        {icon}
                    </div>
                )}
                <Controller
                    name={name}
                    control={control}
                    render={({ field }) => (
                        <Select
                            {...field}
                            options={options}
                            isMulti={isMulti}
                            placeholder={placeholder || `Select ${label}`}
                            value={isMulti
                                ? options.filter(option => (field.value as string[])?.includes(option.value))
                                : options.find(option => option.value === field.value) || null
                            }
                            onChange={(selected) => {
                                if (isMulti) {
                                    field.onChange((selected as SelectOption[])?.map((item) => item.value) || []);
                                } else {
                                    field.onChange((selected as SelectOption)?.value || '');
                                }
                            }}
                            className={`${icon ? 'react-select-with-icon' : ''}`}
                            classNamePrefix="react-select"
                            styles={{
                                control: (base) => ({
                                    ...base,
                                    paddingLeft: icon ? '2rem' : '0.5rem',
                                    minHeight: '42px',
                                    borderColor: '#d4d4d8',
                                    borderRadius: '0.125rem',
                                    '&:hover': {
                                        borderColor: '#a1a1aa'
                                    }
                                }),
                                valueContainer: (base) => ({
                                    ...base,
                                    paddingLeft: icon ? '0.25rem' : '0.5rem',
                                }),
                                placeholder: (base) => ({
                                    ...base,
                                    color: '#a1a1aa'
                                }),
                                menu: (base) => ({
                                    ...base,
                                    zIndex: 50
                                })
                            }}
                        />
                    )}
                />
            </div>
            {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
        </div>
    );
};;