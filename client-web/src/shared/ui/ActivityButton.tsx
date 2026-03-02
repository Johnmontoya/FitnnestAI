import React from 'react';

// 1. Definimos una interfaz clara para la Actividad
interface Activity {
    name: string;
    emoji?: string;
    icon?: React.ComponentType<{ className?: string }>;
    rate?: string;
}

interface ActivityButtonProps extends Activity {
    onClick: () => void;
    selected?: boolean;
}

export const ActivityButton = ({
    name,
    emoji,
    icon: Icon,
    rate,
    onClick,
    selected = false
}: ActivityButtonProps) => {
    return (
        <button
            type="button" // Siempre define el tipo de botón
            onClick={onClick}
            className={`
                relative p-6 rounded-2xl transition-all duration-200
                ${selected
                    ? 'bg-emerald-500 border-2 border-emerald-500 shadow-lg shadow-emerald-500/20'
                    : 'bg-[#1a2f1a] border-2 border-[#2a4a2a] hover:border-emerald-500'
                }
            `}
        >
            <div className="flex flex-col items-center gap-3">
                {emoji ? (
                    <span className="text-4xl" role="img" aria-label={name}>{emoji}</span>
                ) : Icon ? (
                    <Icon className={`w-8 h-8 ${selected ? 'text-black' : 'text-emerald-400'}`} />
                ) : null}

                <div className="text-center">
                    <p className={`font-semibold ${selected ? 'text-black' : 'text-white'}`}>
                        {name}
                    </p>
                    {rate && (
                        <p className={`text-sm mt-1 ${selected ? 'text-black opacity-70' : 'text-gray-400'}`}>
                            {rate} kcal/min
                        </p>
                    )}
                </div>
            </div>
        </button>
    );
};

export const QuickActivitiesGrid = ({
    activities,
    onActivityClick,
    selectedActivity
}: {
    activities: Activity[];
    onActivityClick: (activity: Activity) => void;
    selectedActivity: Activity | null;
}) => {
    return (
        <div className="h-44 mb-4 scrollBar overflow-y-auto pr-2 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {activities.map((activity) => (
                <ActivityButton
                    key={activity.name} // Mejor usar el nombre que el index para el reconciliador de React
                    {...activity}
                    onClick={() => onActivityClick(activity)}
                    selected={selectedActivity?.name === activity.name}
                />
            ))}
        </div>
    );
};