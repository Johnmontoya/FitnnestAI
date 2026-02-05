import React from 'react';
import { BiCoffee, BiCookie, BiEdit, BiMoon, BiSun } from 'react-icons/bi';
import { BsTrash2 } from 'react-icons/bs';
import { FiMoreVertical } from 'react-icons/fi';

const mealIcons: Record<string, React.ComponentType<{ className?: string }>> = {
    breakfast: BiCoffee,
    lunch: BiSun,
    dinner: BiMoon,
    snack: BiCookie,
};

const mealColors: Record<string, { bg: string; text: string; icon: string }> = {
    breakfast: { bg: 'bg-amber-100', text: 'text-amber-600', icon: 'text-amber-500' },
    lunch: { bg: 'bg-orange-100', text: 'text-orange-600', icon: 'text-orange-500' },
    dinner: { bg: 'bg-indigo-100', text: 'text-indigo-600', icon: 'text-indigo-500' },
    snack: { bg: 'bg-pink-100', text: 'text-pink-600', icon: 'text-pink-500' },
};

export const FoodLogItem = ({
    name,
    calories,
    mealType,
    onEdit,
    onDelete,
    showActions = true
}: {
    name: string;
    calories: number;
    mealType: string;
    onEdit?: () => void;
    onDelete?: () => void;
    showActions?: boolean;
}) => {
    const [showMenu, setShowMenu] = React.useState(false);
    const MealIcon = mealIcons[mealType] || BiCoffee;
    const colors = mealColors[mealType] || mealColors.breakfast;

    return (
        <div className="bg-[#1a2f1a] rounded-xl p-4 border border-[#2a4a2a] hover:border-[#00ff66] transition-all group">
            <div className="flex items-center gap-4">
                {/* Icon */}
                <div className={`w-12 h-12 ${colors.bg} rounded-xl flex items-center justify-center flex-shrink-0`}>
                    <MealIcon className={`w-6 h-6 ${colors.icon}`} />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                    <h4 className="text-white font-semibold truncate">{name}</h4>
                    <p className="text-gray-400 text-sm capitalize">
                        {mealType} • {calories} kcal
                    </p>
                </div>

                {/* Calories Badge */}
                <div className="text-white font-bold text-lg flex-shrink-0">
                    {calories}
                    <span className="text-gray-400 text-sm ml-1">kcal</span>
                </div>

                {/* Actions Menu */}
                {showActions && (
                    <div className="relative">
                        <button
                            onClick={() => setShowMenu(!showMenu)}
                            className="p-2 hover:bg-[#2a4a2a] rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                        >
                            <FiMoreVertical className="w-5 h-5 text-gray-400" />
                        </button>

                        {showMenu && (
                            <>
                                <div
                                    className="fixed inset-0 z-10"
                                    onClick={() => setShowMenu(false)}
                                />
                                <div className="absolute right-0 top-full mt-2 bg-[#0f1f0f] border border-[#2a4a2a] rounded-xl p-2 min-w-[150px] z-20 shadow-xl">
                                    <button
                                        onClick={() => {
                                            onEdit?.();
                                            setShowMenu(false);
                                        }}
                                        className="w-full flex items-center gap-3 px-3 py-2 text-white hover:bg-[#1a2f1a] rounded-lg transition-colors"
                                    >
                                        <BiEdit className="w-4 h-4" />
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => {
                                            onDelete?.();
                                            setShowMenu(false);
                                        }}
                                        className="w-full flex items-center gap-3 px-3 py-2 text-red-400 hover:bg-[#1a2f1a] rounded-lg transition-colors"
                                    >
                                        <BsTrash2 className="w-4 h-4" />
                                        Delete
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};