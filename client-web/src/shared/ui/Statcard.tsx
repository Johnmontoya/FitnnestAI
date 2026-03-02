import { BiTrendingDown, BiTrendingUp } from "react-icons/bi";

export const StatCard = ({
    title,
    value,
    unit,
    icon: Icon,
    trend,
    trendValue,
    color = 'var(--accent)'
}: {
    title: string;
    value: string;
    unit?: string;
    icon: React.ComponentType<{ style?: React.CSSProperties }>;
    trend?: 'up' | 'down';
    trendValue?: string;
    color?: string;
}) => {
    const isPositive = trend === 'up';

    return (
        <div
            style={{
                background: 'var(--bg-card)',
                borderRadius: '16px',
                padding: '1.5rem',
                border: '1px solid var(--border)',
                transition: 'border-color 0.25s, transform 0.25s',
                cursor: 'default',
            }}
            onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(198,241,53,0.3)';
                (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)';
                (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
            }}
        >
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <p style={{
                    fontFamily: 'Syne, sans-serif',
                    fontWeight: 600,
                    fontSize: '0.72rem',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: 'var(--text-muted)',
                }}>
                    {title}
                </p>
                {Icon && (
                    <div style={{
                        width: '38px',
                        height: '38px',
                        borderRadius: '10px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: `${color === 'var(--accent)' ? 'rgba(198,241,53,0.1)' : `${color}18`}`,
                        border: `1px solid ${color === 'var(--accent)' ? 'rgba(198,241,53,0.2)' : `${color}30`}`,
                        flexShrink: 0,
                    }}>
                        <Icon style={{ width: '18px', height: '18px', color }} />
                    </div>
                )}
            </div>

            <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginBottom: '0.5rem' }}>
                <span style={{
                    fontFamily: 'Syne, sans-serif',
                    fontWeight: 800,
                    fontSize: '2rem',
                    color: 'var(--text)',
                    lineHeight: 1,
                    letterSpacing: '-0.02em',
                }}>
                    {value}
                </span>
                {unit && (
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: 500 }}>
                        {unit}
                    </span>
                )}
            </div>

            {trendValue && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    {isPositive ? (
                        <BiTrendingUp style={{ width: '14px', height: '14px', color: 'var(--accent)' }} />
                    ) : (
                        <BiTrendingDown style={{ width: '14px', height: '14px', color: '#f87171' }} />
                    )}
                    <span style={{
                        fontSize: '0.78rem',
                        color: isPositive ? 'var(--accent)' : '#f87171',
                        fontWeight: 500,
                    }}>
                        {trendValue}
                    </span>
                </div>
            )}
        </div>
    );
};