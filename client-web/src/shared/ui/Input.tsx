import React, { useState } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    type?: string;
    placeholder?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string;
    icon?: React.ReactNode;
    className?: string;
}

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
}: InputProps) => {
    const [focused, setFocused] = useState(false);

    return (
        <div className={`w-full ${className}`}>
            {label && (
                <label style={{
                    display: 'block',
                    fontFamily: 'Syne, sans-serif',
                    fontWeight: 600,
                    fontSize: '0.75rem',
                    letterSpacing: '0.07em',
                    textTransform: 'uppercase',
                    color: 'var(--text-muted)',
                    marginBottom: '0.5rem',
                }}>
                    {label}
                </label>
            )}
            <div style={{ position: 'relative' }}>
                {icon && (
                    <div style={{
                        position: 'absolute',
                        left: '0.9rem',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: focused ? 'var(--accent)' : 'var(--text-subtle)',
                        transition: 'color 0.2s',
                        display: 'flex',
                        alignItems: 'center',
                    }}>
                        {icon}
                    </div>
                )}
                <input
                    type={type}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    style={{
                        width: '100%',
                        background: 'var(--bg-surface)',
                        color: 'var(--text)',
                        borderRadius: '10px',
                        padding: icon ? '0.8rem 1rem 0.8rem 2.75rem' : '0.8rem 1rem',
                        border: `1px solid ${error ? '#ef4444' : focused ? 'var(--accent)' : 'rgba(198,241,53,0.12)'}`,
                        fontSize: '0.9rem',
                        fontFamily: 'DM Sans, sans-serif',
                        outline: 'none',
                        transition: 'border-color 0.2s, box-shadow 0.2s',
                        boxShadow: focused && !error ? '0 0 0 3px var(--accent-glow)' : 'none',
                    }}
                    {...props}
                />
            </div>
            {error && (
                <p style={{ color: '#f87171', fontSize: '0.78rem', marginTop: '0.35rem' }}>{error}</p>
            )}
        </div>
    );
};

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    label: string;
    options: { value: string; label: string }[];
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    placeholder?: string;
    className?: string;
    error?: string;
}

export const Select = ({
    label,
    options = [],
    value,
    onChange,
    placeholder = 'Seleccionar...',
    className = '',
    error,
    ...props
}: SelectProps) => {
    return (
        <div className={`w-full ${className}`}>
            {label && (
                <label style={{
                    display: 'block',
                    fontFamily: 'Syne, sans-serif',
                    fontWeight: 600,
                    fontSize: '0.75rem',
                    letterSpacing: '0.07em',
                    textTransform: 'uppercase',
                    color: 'var(--text-muted)',
                    marginBottom: '0.5rem',
                }}>
                    {label}
                </label>
            )}
            <select
                value={value}
                onChange={onChange}
                style={{
                    width: '100%',
                    background: 'var(--bg-surface)',
                    color: 'var(--text)',
                    borderRadius: '10px',
                    padding: '0.8rem 1rem',
                    border: '1px solid rgba(198,241,53,0.12)',
                    fontSize: '0.9rem',
                    fontFamily: 'DM Sans, sans-serif',
                    outline: 'none',
                    cursor: 'pointer',
                    transition: 'border-color 0.2s, box-shadow 0.2s',
                }}
                onFocus={e => {
                    e.currentTarget.style.borderColor = 'var(--accent)';
                    e.currentTarget.style.boxShadow = '0 0 0 3px var(--accent-glow)';
                }}
                onBlur={e => {
                    e.currentTarget.style.borderColor = error ? '#ef4444' : 'rgba(198,241,53,0.12)';
                    e.currentTarget.style.boxShadow = 'none';
                }}
                {...props}
            >
                <option value="" disabled>{placeholder}</option>
                {options.map((option) => (
                    <option key={option.value} value={option.value} style={{ background: 'var(--bg-surface)' }}>
                        {option.label}
                    </option>
                ))}
            </select>
            {error && (
                <p style={{ color: '#f87171', fontSize: '0.78rem', marginTop: '0.35rem' }}>{error}</p>
            )}
        </div>
    );
};