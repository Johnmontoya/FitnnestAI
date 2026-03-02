import type { Meta, StoryObj } from '@storybook/react-vite';
import { StatCard } from '../../shared/ui/Statcard';
import { LuFlame, LuFootprints } from 'react-icons/lu';
import { BsClock } from 'react-icons/bs';
import { BiDroplet } from 'react-icons/bi';

/**
 * `StatCard` displays a single KPI metric with an icon, value, optional unit,
 * and a percentage trend indicator. Used across the Activity and Dashboard pages.
 */
const meta: Meta<typeof StatCard> = {
    title: 'Shared UI/StatCard',
    component: StatCard,
    parameters: { layout: 'centered' },
    tags: ['autodocs'],
    decorators: [
        (Story) => (
            <div style={{ width: '280px' }}>
                <Story />
            </div>
        ),
    ],
    argTypes: {
        title: { control: 'text' },
        value: { control: 'text' },
        unit: { control: 'text' },
        trend: {
            control: 'select',
            options: [undefined, 'up', 'down'],
            description: 'Trend direction — green for up, red for down',
        },
        trendValue: { control: 'text' },
        color: { control: 'color' },
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const CaloriesBurned: Story = {
    name: 'Calories Burned — Trend Up',
    args: {
        title: 'Gasto Calórico',
        value: '820',
        unit: 'kcal',
        icon: LuFlame,
        trend: 'up',
        trendValue: '+12.4% vs anterior',
        color: 'var(--accent)',
    },
};

export const ActiveTime: Story = {
    name: 'Active Time — Trend Down',
    args: {
        title: 'Tiempo de Actividad',
        value: '47',
        unit: 'min',
        icon: BsClock,
        trend: 'down',
        trendValue: '-8.3% vs anterior',
        color: '#f87171',
    },
};

export const TotalSteps: Story = {
    name: 'Total Steps — No Trend',
    args: {
        title: 'Pasos Totales',
        value: '7,430',
        icon: LuFootprints,
        color: 'var(--accent)',
    },
};

export const Hydration: Story = {
    name: 'Hydration — Blue',
    args: {
        title: 'Hidratación',
        value: '1.8',
        unit: 'L',
        icon: BiDroplet,
        trend: 'up',
        trendValue: '+0.3L hoy',
        color: '#38bdf8',
    },
};
