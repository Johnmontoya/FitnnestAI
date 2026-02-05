import React from 'react';

export const Input = ({
    label,
    type = 'text',
    placeholder,
    value,
    onChange,
    error,
    icon,
    className = '',
    ...props
}: {
    label: string;
    type?: string;
    placeholder?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string;
    icon?: React.ReactNode;
    className?: string;
    [key: string]: any;
}) => {
    return (
        <div className={`w-full ${className}`}>
            {label && (
                <label className="block text-white text-sm font-medium mb-2">
                    {label}
                </label>
            )}
            <div className="relative">
                {icon && (
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                        {icon}
                    </div>
                )}
                <input
                    type={type}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    className={`
            w-full bg-[#0f1f0f] text-white rounded-xl px-4 py-3
            ${icon ? 'pl-12' : ''}
            border border-[#2a4a2a] focus:border-[#00ff66] focus:outline-none
            placeholder:text-gray-500 transition-colors
          `}
                    {...props}
                />
            </div>
            {error && (
                <p className="text-red-400 text-sm mt-1">{error}</p>
            )}
        </div>
    );
};

export const Select = ({
    label,
    options = [],
    value,
    onChange,
    placeholder = 'Select...',
    className = '',
    ...props
}: {
    label: string;
    options: { value: string; label: string }[];
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    placeholder?: string;
    className?: string;
    [key: string]: any;
}) => {
    return (
        <div className={`w-full ${className}`}>
            {label && (
                <label className="block text-white text-sm font-medium mb-2">
                    {label}
                </label>
            )}
            <select
                value={value}
                onChange={onChange}
                className="
          w-full bg-[#0f1f0f] text-white rounded-xl px-4 py-3
          border border-[#2a4a2a] focus:border-[#00ff66] focus:outline-none
          cursor-pointer transition-colors
        "
                {...props}
            >
                <option value="" disabled>{placeholder}</option>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};