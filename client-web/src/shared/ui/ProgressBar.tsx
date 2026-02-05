export const ProgressBar = ({
    value,
    max,
    color = '#00ff66',
    label,
    showValues = true,
    height = 'h-2'
}: {
    value: number;
    max: number;
    color?: string;
    label?: string;
    showValues?: boolean;
    height?: string;
}) => {
    const percentage = Math.min((value / max) * 100, 100);

    return (
        <div className="w-full">
            {label && (
                <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-400 text-sm font-medium">{label}</span>
                    {showValues && (
                        <span className="text-white text-sm font-semibold">
                            {value} / {max}
                        </span>
                    )}
                </div>
            )}
            <div className={`w-full bg-[#1a2f1a] rounded-full overflow-hidden ${height}`}>
                <div
                    className="h-full rounded-full transition-all duration-500 ease-out"
                    style={{
                        width: `${percentage}%`,
                        backgroundColor: color
                    }}
                />
            </div>
        </div>
    );
};