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
    BREAKFAST: '#f59e0b',
    LUNCH: '#fb923c',
    DINNER: '#818cf8',
    SNACK: '#f472b6',
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
            setTimeout(() => setShowDeleteConfirm(false), 3000);
        }
    };

    const accentColor = mealTypeColors[mealType] || 'var(--text-muted)';

    return (
        <div style={{
            background: 'var(--bg-surface)',
            border: '1px solid var(--border)',
            borderRadius: '12px',
            padding: '1rem',
            transition: 'border-color 0.2s, transform 0.2s',
            position: 'relative',
            overflow: 'hidden',
        }}>
            {/* Left accent line */}
            <div style={{
                position: 'absolute',
                left: 0, top: 0, bottom: 0,
                width: '3px',
                background: accentColor,
            }} />

            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem' }}>
                <div style={{ flex: 1, minWidth: 0, paddingLeft: '0.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                        <span style={{ fontSize: '0.9rem' }}>{mealTypeEmojis[mealType]}</span>
                        <span style={{
                            fontFamily: 'Syne, sans-serif',
                            fontWeight: 700,
                            fontSize: '0.6rem',
                            letterSpacing: '0.1em',
                            textTransform: 'uppercase',
                            color: 'var(--text-muted)',
                        }}>
                            {mealTypeLabels[mealType] || mealType}
                        </span>
                    </div>

                    <h4 style={{
                        fontFamily: 'Syne, sans-serif',
                        fontWeight: 700,
                        fontSize: '1rem',
                        color: 'var(--text)',
                        marginBottom: '4px',
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                        textOverflow: 'ellipsis',
                    }}>
                        {name}
                    </h4>

                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '8px' }}>
                        <span style={{
                            fontFamily: 'Syne, sans-serif',
                            fontWeight: 800,
                            fontSize: '1.2rem',
                            color: 'var(--accent)',
                        }}>
                            {calories}
                        </span>
                        <span style={{ fontSize: '0.7rem', color: 'var(--text-subtle)', fontWeight: 600 }}>KCAL</span>
                        {portion && (
                            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginLeft: '4px' }}>
                                • {portion}g
                            </span>
                        )}
                    </div>

                    {/* Macros */}
                    <div style={{ display: 'flex', gap: '12px', fontSize: '0.7rem' }}>
                        {proteinas !== undefined && (
                            <div style={{ color: 'var(--text-muted)' }}>
                                <span style={{ fontWeight: 700, color: 'var(--accent)' }}>P</span> {proteinas}g
                            </div>
                        )}
                        {carbs !== undefined && (
                            <div style={{ color: 'var(--text-muted)' }}>
                                <span style={{ fontWeight: 700, color: '#38bdf8' }}>C</span> {carbs}g
                            </div>
                        )}
                        {fats !== undefined && (
                            <div style={{ color: 'var(--text-muted)' }}>
                                <span style={{ fontWeight: 700, color: '#fbbf24' }}>F</span> {fats}g
                            </div>
                        )}
                    </div>
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
                    <button
                        onClick={onEdit}
                        title='Editar'
                        aria-label='Editar'
                        style={{
                            width: '32px', height: '32px',
                            borderRadius: '8px',
                            background: 'var(--bg-elevated)',
                            border: '1px solid var(--border)',
                            color: 'var(--text-muted)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            cursor: 'pointer', transition: 'all 0.2s',
                        }}
                    >
                        <BiEdit style={{ width: '16px', height: '16px' }} />
                    </button>
                    <button
                        onClick={handleDelete}
                        title='Eliminar'
                        aria-label='Eliminar'
                        style={{
                            width: '32px', height: '32px',
                            borderRadius: '8px',
                            background: showDeleteConfirm ? '#ef4444' : 'var(--bg-elevated)',
                            border: `1px solid ${showDeleteConfirm ? '#ef4444' : 'var(--border)'}`,
                            color: showDeleteConfirm ? '#fff' : '#f87171',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            cursor: 'pointer', transition: 'all 0.2s',
                        }}
                    >
                        <BiTrash style={{ width: '16px', height: '16px' }} />
                    </button>
                </div>
            </div>

            {showDeleteConfirm && (
                <div style={{
                    marginTop: '8px', paddingTop: '8px',
                    borderTop: '1px solid rgba(239,68,68,0.2)',
                    color: '#f87171', fontSize: '0.65rem', fontWeight: 600,
                    textAlign: 'center',
                }}>
                    ¡CLIC OTRA VEZ PARA ELIMINAR!
                </div>
            )}
        </div>
    );
};