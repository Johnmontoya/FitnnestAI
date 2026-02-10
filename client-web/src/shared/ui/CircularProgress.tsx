export const CircularProgress = ({
    value,
    max,
    size = 200,
    strokeWidth = 12,
    color = '#00ff66',
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
    const percentage = Math.min((value / max) * 100, 100);
    const offset = circumference - (percentage / 100) * circumference;

    return (
        <div className="relative inline-flex items-center justify-center">
            <svg width={size} height={size} className="transform -rotate-90">
                {/* Background circle */}
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="none"
                    stroke="#1a2f1a"
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
                    className="transition-all duration-500 ease-out"
                />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="text-white text-4xl font-bold">
                    {label || value.toLocaleString()}
                </div>
                {sublabel && (
                    <div className="text-gray-200 text-sm mt-1">{sublabel}</div>
                )}
                {showPercentage && (
                    <div className="text-gray-200 text-sm mt-1">
                        {percentage.toFixed(0)}%
                    </div>
                )}
            </div>
        </div>
    );
};