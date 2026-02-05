import React from 'react';

export const ActivityButton = ({
    name,
    emoji,
    icon: Icon,
    rate,
    onClick,
    selected = false
}: {
    name: string;
    emoji?: string;
    icon?: React.ComponentType<{ className?: string }>;
    rate?: string;
    onClick?: () => void;
    selected?: boolean;
}) => {
    return (
        <button
            onClick={onClick}
            className={`
        relative p-6 rounded-2xl transition-all
        ${selected
                    ? 'bg-[#00ff66] border-2 border-[#00ff66]'
                    : 'bg-[#1a2f1a] border-2 border-[#2a4a2a] hover:border-[#00ff66]'
                }
      `}
        >
            <div className="flex flex-col items-center gap-3">
                {emoji ? (
                    <span className="text-4xl">{emoji}</span>
                ) : Icon ? (
                    <Icon className={`w-8 h-8 ${selected ? 'text-black' : 'text-[#00ff66]'}`} />
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

export const QuickActivitiesGrid = ({ activities, onActivityClick, selectedActivity }: {
    activities: any[];
    onActivityClick: (activity: any) => void;
    selectedActivity: any;
}) => {
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {activities.map((activity, index) => (
                <ActivityButton
                    key={index}
                    {...activity}
                    onClick={() => onActivityClick(activity)}
                    selected={selectedActivity?.name === activity.name}
                />
            ))}
        </div>
    );
};