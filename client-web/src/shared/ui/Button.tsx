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
        transition: 'background 0.2s, transform 0.15s, box-shadow 0.2s, border-color 0.2s',
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
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`${variant === 'primary' ? 'btn-primary' : ''} ${className}`}
            style={{ ...baseStyle, ...variantStyles[variant], ...sizeStyles[size] }}
            onMouseEnter={e => {
                if (disabled) return;
                const el = e.currentTarget as HTMLElement;
                if (variant === 'primary') {
                    el.style.background = 'var(--accent-dim)';
                    el.style.transform = 'translateY(-1px)';
                } else if (variant === 'outline') {
                    el.style.background = 'rgba(198,241,53,0.08)';
                    el.style.transform = 'translateY(-1px)';
                } else if (variant === 'secondary') {
                    el.style.borderColor = 'rgba(198,241,53,0.25)';
                    el.style.background = 'var(--bg-surface)';
                } else if (variant === 'danger') {
                    el.style.background = 'rgba(239,68,68,0.2)';
                    el.style.transform = 'translateY(-1px)';
                }
            }}
            onMouseLeave={e => {
                if (disabled) return;
                const el = e.currentTarget as HTMLElement;
                const vs = variantStyles[variant];
                el.style.background = vs.background as string;
                el.style.transform = 'none';
                if (variant === 'secondary') el.style.borderColor = 'var(--border)';
            }}
            onMouseDown={e => {
                if (disabled) return;
                (e.currentTarget as HTMLElement).style.transform = 'scale(0.97)';
            }}
            onMouseUp={e => {
                if (disabled) return;
                (e.currentTarget as HTMLElement).style.transform = 'none';
            }}
            {...props}
        >
            {children}
        </button>
    );
};