import React from 'react';

export const Card = ({
    children,
    className = '',
    padding = 'p-6',
    accent = false,
}: {
    children: React.ReactNode;
    className?: string;
    padding?: string;
    accent?: boolean;
}) => {
    return (
        <div
            style={{
                background: 'var(--bg-card)',
                borderRadius: '16px',
                border: accent ? '1px solid rgba(198,241,53,0.25)' : '1px solid var(--border)',
                transition: 'border-color 0.2s',
            }}
            className={`${padding} ${className}`}
        >
            {children}
        </div>
    );
};

export const CardHeader = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => {
    return (
        <div className={`mb-4 ${className}`}>
            {children}
        </div>
    );
};

export const CardTitle = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => {
    return (
        <h3
            style={{
                fontFamily: 'Syne, sans-serif',
                fontWeight: 700,
                fontSize: '1rem',
                color: 'var(--text)',
                letterSpacing: '-0.01em',
            }}
            className={className}
        >
            {children}
        </h3>
    );
};

export const CardContent = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => {
    return (
        <div className={className}>
            {children}
        </div>
    );
};