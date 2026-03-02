export const ProgressBar = ({
    value,
    max,
    color = 'var(--accent)',
    label,
    showValues = true,
    height = '8px'
}: {
    value: number;
    max: number;
    color?: string;
    label?: string;
    showValues?: boolean;
    height?: string;
}) => {
    const percentage = Math.min((value / max) * 100, 100) || 0;

    return (
        <div style={{ width: '100%' }}>
            {label && (
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span style={{
                        fontFamily: 'Syne, sans-serif',
                        fontWeight: 700,
                        fontSize: '0.65rem',
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        color: 'var(--text-muted)',
                    }}>
                        {label}
                    </span>
                    {showValues && (
                        <span style={{
                            fontFamily: 'DM Sans, sans-serif',
                            fontWeight: 700,
                            fontSize: '0.8rem',
                            color: 'var(--text)',
                        }}>
                            {value} <span style={{ color: 'var(--text-subtle)', fontWeight: 500 }}>/ {max}</span>
                        </span>
                    )}
                </div>
            )}
            <div style={{
                width: '100%',
                background: 'var(--bg-elevated)',
                borderRadius: '100px',
                height: height,
                overflow: 'hidden',
                position: 'relative',
            }}>
                <div
                    style={{
                        height: '100%',
                        borderRadius: '100px',
                        width: `${percentage}%`,
                        backgroundColor: color,
                        boxShadow: `0 0 10px ${color}40`,
                        transition: 'width 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
                    }}
                />
            </div>
        </div>
    );
};