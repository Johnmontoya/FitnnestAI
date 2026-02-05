import React from 'react';

export const Card = ({ children, className = '', padding = 'p-6' }: { children: React.ReactNode, className?: string, padding?: string }) => {
    return (
        <div className={`bg-[#1a2f1a] rounded-2xl ${padding} ${className}`}>
            {children}
        </div>
    );
};

export const CardHeader = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => {
    return (
        <div className={`mb-4 ${className}`}>
            {children}
        </div>
    );
};

export const CardTitle = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => {
    return (
        <h3 className={`text-white text-xl font-bold ${className}`}>
            {children}
        </h3>
    );
};

export const CardContent = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => {
    return (
        <div className={className}>
            {children}
        </div>
    );
};