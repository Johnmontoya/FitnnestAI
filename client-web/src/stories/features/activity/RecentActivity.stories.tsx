import type { Meta, StoryObj } from '@storybook/react-vite';
import moment from 'moment';

// ── Inline presentational version to avoid React Query hook dependency ────────
// RecentActivity requires `useActivityMutation` (React Query mutation).
// Rather than mocking the module, we recreate the pure presentational UI
// directly in the story using the same design tokens and styling.

import { BiTrash, BiRun, BiCycling, BiDumbbell, BiWalk, BiHistory } from 'react-icons/bi';
import { LuActivity } from 'react-icons/lu';
import type { ActivityResponse } from '../../../features/activity/types/activity.types';
import { fn } from 'storybook/test';

function getActivityIcon(name: string) {
    const n = name.toLowerCase();
    if (n.includes('run') || n.includes('correr')) return <BiRun />;
    if (n.includes('cycle') || n.includes('bici')) return <BiCycling />;
    if (n.includes('lift') || n.includes('pesas') || n.includes('gym')) return <BiDumbbell />;
    if (n.includes('walk') || n.includes('caminar')) return <BiWalk />;
    return <LuActivity />;
}

interface RecentActivityPreviewProps {
    activities: ActivityResponse[];
    onDelete?: (id: string) => void;
}

function RecentActivityPreview({ activities, onDelete }: RecentActivityPreviewProps) {
    return (
        <div className="glass rounded-[32px] border-[var(--border)] p-8! mb-4!">
            <div className="flex items-center justify-between mb-8!">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[var(--accent)]/10 flex items-center justify-center">
                        <BiHistory className="w-5 h-5 text-[var(--accent)]" />
                    </div>
                    <h3 className="font-display font-extrabold text-xl text-white tracking-tight">Registro de Sesiones</h3>
                </div>
            </div>

            <div className="space-y-4!">
                {!activities || activities.length === 0 ? (
                    <div className="text-center py-12 bg-white/[0.02] rounded-2xl border border-dashed border-white/10">
                        <LuActivity className="w-12 h-12 text-[var(--text-subtle)] mx-auto mb-4 opacity-20" />
                        <p className="font-display font-bold text-[var(--text-muted)] uppercase tracking-widest text-xs">Sistema Inactivo</p>
                        <p className="text-[var(--text-subtle)] text-xs mt-1">Registra tu entrenamiento para activar el registro</p>
                    </div>
                ) : (
                    activities.slice(0, 5).map((activity) => (
                        <div key={activity.id} className="group relative bg-[var(--bg-elevated)]/40 border border-white/5 rounded-2xl p-4 transition-all duration-300 hover:border-[var(--accent)]/30">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-black/40 flex items-center justify-center border border-white/5 text-[var(--accent)]">
                                        {getActivityIcon(activity.name)}
                                    </div>
                                    <div>
                                        <h4 className="font-display font-bold text-white text-md tracking-tight">{activity.name}</h4>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className="text-[var(--accent)] font-black text-xs tracking-tighter uppercase">{activity.calories} kcal</span>
                                            <span className="text-white/10">•</span>
                                            <span className="text-[var(--text-subtle)] text-[0.7rem] font-bold uppercase tracking-wider">{activity.duration} min</span>
                                            <span className="text-white/10">•</span>
                                            <span className="text-[var(--text-subtle)] text-[0.65rem] font-medium tracking-tight uppercase">{moment(activity.date).format('DD MMM')}</span>
                                        </div>
                                    </div>
                                </div>
                                <button
                                    title='Eliminar'
                                    aria-label='Eliminar'
                                    onClick={() => onDelete?.(activity.id)}
                                    className="p-2! mr-2! rounded-lg bg-white/5 hover:bg-red-500/20 hover:text-red-500 text-[var(--text-muted)]"
                                >
                                    <BiTrash className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta<typeof RecentActivityPreview> = {
    title: 'Features/Activity/RecentActivity',
    component: RecentActivityPreview,
    parameters: {
        layout: 'padded',
        backgrounds: { default: 'dark' },
    },
    tags: ['autodocs'],
    argTypes: {
        onDelete: { action: 'delete activity' },
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

const today = moment().toISOString();
const yesterday = moment().subtract(1, 'days').toISOString();

const mockActivities: ActivityResponse[] = [
    { id: '1', name: 'Correr', calories: 520, duration: 45, date: today, createdAt: today, userId: 'u1', documentId: 'd1', updatedAt: today },
    { id: '2', name: 'Gym - Pesas', calories: 380, duration: 60, date: today, createdAt: today, userId: 'u1', documentId: 'd2', updatedAt: today },
    { id: '3', name: 'Ciclismo', calories: 600, duration: 75, date: yesterday, createdAt: yesterday, userId: 'u1', documentId: 'd3', updatedAt: yesterday },
    { id: '4', name: 'Caminar', calories: 200, duration: 30, date: yesterday, createdAt: yesterday, userId: 'u1', documentId: 'd4', updatedAt: yesterday },
    { id: '5', name: 'Natación', calories: 450, duration: 50, date: yesterday, createdAt: yesterday, userId: 'u1', documentId: 'd5', updatedAt: yesterday },
];

export const WithActivities: Story = {
    name: 'Con Sesiones de Actividad',
    args: {
        activities: mockActivities,
        onDelete: fn(),
    },
    decorators: [
        (Story) => (
            <div style={{ maxWidth: '640px' }}>
                <Story />
            </div>
        ),
    ],
};

export const EmptyState: Story = {
    name: 'Estado Vacío (Sin Registros)',
    args: {
        activities: [],
        onDelete: fn(),
    },
    decorators: [
        (Story) => (
            <div style={{ maxWidth: '640px' }}>
                <Story />
            </div>
        ),
    ],
};

export const SingleActivity: Story = {
    name: 'Una Sola Actividad',
    args: {
        activities: [mockActivities[0]],
        onDelete: fn(),
    },
    decorators: [
        (Story) => (
            <div style={{ maxWidth: '640px' }}>
                <Story />
            </div>
        ),
    ],
};
