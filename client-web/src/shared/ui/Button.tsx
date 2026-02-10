
import React from 'react';

export const Button = ({
    children,
    variant = 'primary',
    size = 'md',
    className = '',
    onClick,
    disabled = false,
    type = 'button',
    ...props
}: {
    children: React.ReactNode;
    variant?: 'primary' | 'secondary' | 'outline' | 'danger';
    size?: 'sm' | 'md' | 'lg';
    className?: string;
    onClick?: () => void;
    disabled?: boolean;
    type?: 'button' | 'submit' | 'reset';
    [key: string]: any;
}) => {
    const baseStyles = 'rounded-xl font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed';

    const variants = {
        primary: 'bg-emerald-500 text-black hover:bg-emerald-600',
        secondary: 'bg-[#2a4a2a] text-white hover:bg-[#3a5a3a]',
        outline: 'border-2 border-[#00ff66] text-[#00ff66] hover:bg-[#00ff66] hover:text-black',
        danger: 'bg-red-500 text-white hover:bg-red-600',
    };

    const sizes = {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-6 py-3 text-base',
        lg: 'px-8 py-4 text-lg',
    };

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};