import React from 'react';

// Definimos los tipos fuera para mayor limpieza
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'danger';
    size?: 'sm' | 'md' | 'lg';
}

export const Button = ({
    children,
    variant = 'primary',
    size = 'md',
    className = '',
    disabled = false,
    ...props
}: ButtonProps) => {

    // Estilos base que no cambian
    const baseStyle: React.CSSProperties = {
        position: 'relative',
        overflow: 'hidden',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Syne, sans-serif',
        fontWeight: 700,
        letterSpacing: '0.04em',
        borderRadius: '10px',
        border: 'none',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        transition: 'all 0.2s ease-in-out', // Simplificamos la transición
    };

    const variantStyles: Record<string, React.CSSProperties> = {
        primary: {
            background: 'var(--accent)',
            color: '#0a0a0a',
        },
        secondary: {
            background: 'var(--bg-elevated)',
            color: 'var(--text)',
            border: '1px solid var(--border)',
        },
        outline: {
            background: 'transparent',
            color: 'var(--accent)',
            border: '1px solid var(--accent)',
        },
        danger: {
            background: 'rgba(239,68,68,0.12)',
            color: '#f87171',
            border: '1px solid rgba(239,68,68,0.3)',
        },
    };

    const sizeStyles: Record<string, React.CSSProperties> = {
        sm: { padding: '0.45rem 1rem', fontSize: '0.8rem' },
        md: { padding: '0.75rem 1.5rem', fontSize: '0.9rem' },
        lg: { padding: '0.95rem 2.2rem', fontSize: '1rem' },
    };

    return (
        <button
            disabled={disabled}
            // Agregamos una clase dinámica para manejar los hovers en CSS
            className={`custom-btn btn-${variant} ${className}`}
            style={{
                ...baseStyle,
                ...variantStyles[variant],
                ...sizeStyles[size]
            }}
            {...props}
        >
            {children}
        </button>
    );
};