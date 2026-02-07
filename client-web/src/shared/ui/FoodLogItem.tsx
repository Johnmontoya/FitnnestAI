import { BiEdit, BiTrash } from 'react-icons/bi';
import { useState } from 'react';

interface FoodLogItemProps {
    name: string;
    calories: number;
    mealType: string;
    proteinas?: number;
    carbs?: number;
    fats?: number;
    portion?: number;
    onEdit: () => void;
    onDelete: () => void;
}

const mealTypeEmojis: Record<string, string> = {
    BREAKFAST: '🌅',
    LUNCH: '☀️',
    DINNER: '🌙',
    SNACK: '🍪',
};

const mealTypeLabels: Record<string, string> = {
    BREAKFAST: 'Desayuno',
    LUNCH: 'Almuerzo',
    DINNER: 'Cena',
    SNACK: 'Snack',
};

const mealTypeColors: Record<string, string> = {
    BREAKFAST: 'bg-amber-500',
    LUNCH: 'bg-orange-500',
    DINNER: 'bg-indigo-500',
    SNACK: 'bg-pink-500',
};

export const FoodLogItem = ({
    name,
    calories,
    mealType,
    proteinas,
    carbs,
    fats,
    portion,
    onEdit,
    onDelete,
}: FoodLogItemProps) => {
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    const handleDelete = () => {
        if (showDeleteConfirm) {
            onDelete();
            setShowDeleteConfirm(false);
        } else {
            setShowDeleteConfirm(true);
            // Auto-cancel after 3 seconds
            setTimeout(() => setShowDeleteConfirm(false), 3000);
        }
    };

    return (
        <div className="bg-[#0a150a] border border-[#2a4a2a] rounded-xl p-4 hover:border-[#3a5a3a] transition-all">
            <div className="flex items-start justify-between gap-4">
                {/* Left side - Info */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                        <span className={`w-2 h-2 rounded-full ${mealTypeColors[mealType] || 'bg-gray-500'}`} />
                        <span className="text-gray-400 text-xs font-medium">
                            {mealTypeEmojis[mealType]} {mealTypeLabels[mealType] || mealType}
                        </span>
                    </div>

                    <h4 className="text-white font-semibold text-lg mb-1 truncate">
                        {name}
                    </h4>

                    <div className="flex items-center gap-3 text-sm">
                        <div className="flex items-center gap-1">
                            <span className="text-[#00ff66] font-bold">{calories}</span>
                            <span className="text-gray-400">kcal</span>
                        </div>
                        {portion && (
                            <div className="flex items-center gap-1">
                                <span className="text-gray-400">•</span>
                                <span className="text-gray-400">{portion}g</span>
                            </div>
                        )}
                    </div>

                    {/* Macros */}
                    {(proteinas || carbs || fats) && (
                        <div className="flex items-center gap-3 mt-2 text-xs">
                            {proteinas !== undefined && (
                                <div className="text-gray-400">
                                    P: <span className="text-[#00ff66]">{proteinas}g</span>
                                </div>
                            )}
                            {carbs !== undefined && (
                                <div className="text-gray-400">
                                    C: <span className="text-blue-400">{carbs}g</span>
                                </div>
                            )}
                            {fats !== undefined && (
                                <div className="text-gray-400">
                                    F: <span className="text-amber-400">{fats}g</span>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Right side - Actions */}
                <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            onEdit();
                        }}
                        className="p-2 rounded-lg bg-[#1a2f1a] hover:bg-[#2a4a2a] text-blue-400 hover:text-blue-300 transition-all"
                        title="Editar"
                        type="button"
                    >
                        <BiEdit className="w-5 h-5" />
                    </button>

                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleDelete();
                        }}
                        className={`p-2 rounded-lg transition-all ${showDeleteConfirm
                                ? 'bg-red-500 hover:bg-red-600 text-white'
                                : 'bg-[#1a2f1a] hover:bg-[#2a4a2a] text-red-400 hover:text-red-300'
                            }`}
                        title={showDeleteConfirm ? 'Confirmar eliminación' : 'Eliminar'}
                        type="button"
                    >
                        <BiTrash className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Delete confirmation message */}
            {showDeleteConfirm && (
                <div className="mt-3 pt-3 border-t border-red-500 border-opacity-30">
                    <p className="text-red-400 text-sm">
                        ⚠️ Haz clic nuevamente en eliminar para confirmar
                    </p>
                </div>
            )}
        </div>
    );
};