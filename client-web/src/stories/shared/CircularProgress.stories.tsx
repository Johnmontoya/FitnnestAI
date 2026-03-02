import type { Meta, StoryObj } from '@storybook/react-vite';
import { CircularProgress } from '../../shared/ui/CircularProgress';

/**
 * `CircularProgress` renders an SVG donut chart used to visualise macro targets,
 * calorie goals, and step progress in the Biopunk Athletic interface.
 */
const meta: Meta<typeof CircularProgress> = {
    title: 'Shared UI/CircularProgress',
    component: CircularProgress,
    parameters: { layout: 'centered' },
    tags: ['autodocs'],
    argTypes: {
        value: {
            control: { type: 'range', min: 0, max: 3000, step: 50 },
            description: 'Current progress value',
        },
        max: {
            control: { type: 'number' },
            description: 'Maximum value (goal)',
        },
        size: {
            control: { type: 'range', min: 80, max: 300, step: 10 },
            description: 'SVG diameter in px',
            table: { defaultValue: { summary: '200' } },
        },
        strokeWidth: {
            control: { type: 'range', min: 4, max: 24, step: 2 },
        },
        color: { control: 'color' },
        label: { control: 'text' },
        sublabel: { control: 'text' },
        showPercentage: { control: 'boolean' },
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const CalorieGoal: Story = {
    name: 'Calorie Goal (75%)',
    args: {
        value: 1500,
        max: 2000,
        size: 200,
        strokeWidth: 16,
        color: 'var(--accent)',
        label: '1,500',
        sublabel: 'KCAL TOTALES',
        showPercentage: true,
    },
};

export const StepProgress: Story = {
    name: 'Step Progress (40%)',
    args: {
        value: 4000,
        max: 10000,
        size: 180,
        strokeWidth: 14,
        color: 'var(--accent)',
        label: '40%',
        sublabel: 'OPTIMIZADO',
        showPercentage: false,
    },
};

export const Completed: Story = {
    name: 'Goal Completed (100%)',
    args: {
        value: 2000,
        max: 2000,
        size: 160,
        strokeWidth: 12,
        color: '#22c55e',
        label: '100%',
        sublabel: 'COMPLETADO',
        showPercentage: false,
    },
};

export const Hydration: Story = {
    name: 'Hydration Goal (Blue)',
    args: {
        value: 1800,
        max: 2500,
        size: 160,
        strokeWidth: 12,
        color: '#38bdf8',
        label: '1.8',
        sublabel: 'LITROS',
        showPercentage: true,
    },
};

export const Empty: Story = {
    name: 'Empty (0%)',
    args: {
        value: 0,
        max: 2000,
        size: 160,
        strokeWidth: 12,
        color: 'var(--accent)',
        label: '0',
        sublabel: 'INICIO',
        showPercentage: false,
    },
};
