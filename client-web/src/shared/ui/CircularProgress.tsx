export const CircularProgress = ({
    value,
    max,
    size = 200,
    strokeWidth = 12,
    color = 'var(--accent)',
    label,
    sublabel,
    showPercentage = false
}: {
    value: number;
    max: number;
    size?: number;
    strokeWidth?: number;
    color?: string;
    label?: string;
    sublabel?: string;
    showPercentage?: boolean;
}) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const percentage = Math.min((value / max) * 100, 100) || 0;
    const offset = circumference - (percentage / 100) * circumference;

    return (
        <div style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
                {/* Background circle */}
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="none"
                    stroke="var(--bg-elevated)"
                    strokeWidth={strokeWidth}
                />
                {/* Progress circle */}
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="none"
                    stroke={color}
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                    style={{ transition: 'stroke-dashoffset 0.5s ease-out' }}
                />
            </svg>
            <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <div className="p-2!" style={{
                    fontFamily: 'Syne, sans-serif',
                    fontWeight: 800,
                    fontSize: `${size / 5.5}px`,
                    color: 'var(--text)',
                    lineHeight: 1,
                }}>
                    {label || value.toLocaleString()}
                </div>
                {sublabel && (
                    <div style={{
                        fontFamily: 'Syne, sans-serif',
                        fontWeight: 700,
                        fontSize: `${size / 15}px`,
                        color: 'var(--text-muted)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        marginTop: '4px',
                    }}>
                        {sublabel}
                    </div>
                )}
                {showPercentage && (
                    <div style={{
                        fontFamily: 'DM Sans, sans-serif',
                        fontWeight: 600,
                        fontSize: `${size / 12}px`,
                        color: color,
                        marginTop: '2px',
                    }}>
                        {percentage.toFixed(0)}%
                    </div>
                )}
            </div>
        </div>
    );
};