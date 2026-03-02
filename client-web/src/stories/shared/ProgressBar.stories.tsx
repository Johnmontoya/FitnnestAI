import type { Meta, StoryObj } from '@storybook/react-vite';
import { ProgressBar } from '../../shared/ui/ProgressBar';

/**
 * `ProgressBar` renders a linear progress indicator used for macros,
 * calorie budgets, and hydration tracking.
 */
const meta: Meta<typeof ProgressBar> = {
    title: 'Shared UI/ProgressBar',
    component: ProgressBar,
    parameters: { layout: 'centered' },
    tags: ['autodocs'],
    decorators: [
        (Story) => (
            <div style={{ width: '340px' }}>
                <Story />
            </div>
        ),
    ],
    argTypes: {
        value: {
            control: { type: 'range', min: 0, max: 2000, step: 50 },
        },
        max: {
            control: { type: 'number' },
        },
        color: { control: 'color' },
        label: { control: 'text' },
        showValues: { control: 'boolean' },
        height: {
            control: 'select',
            options: ['4px', '6px', '8px', '12px', '16px'],
        },
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const CaloriesLime: Story = {
    name: 'Lime — Calories (75%)',
    args: {
        value: 1500,
        max: 2000,
        color: 'var(--accent)',
        label: 'Gasto Calórico',
        showValues: true,
        height: '8px',
    },
};

export const ProteinAccent: Story = {
    name: 'Green — Protein (60%)',
    args: {
        value: 90,
        max: 150,
        color: '#c6f135',
        label: 'Proteínas',
        showValues: true,
        height: '6px',
    },
};

export const CarbsBlue: Story = {
    name: 'Blue — Carbs (80%)',
    args: {
        value: 160,
        max: 200,
        color: '#38bdf8',
        label: 'Carbohidratos',
        showValues: true,
        height: '6px',
    },
};

export const FatsAmber: Story = {
    name: 'Amber — Fats (45%)',
    args: {
        value: 30,
        max: 65,
        color: '#fbbf24',
        label: 'Grasas',
        showValues: true,
        height: '6px',
    },
};

export const ThickHydration: Story = {
    name: 'Thick — Hydration',
    args: {
        value: 1800,
        max: 2500,
        color: '#38bdf8',
        showValues: false,
        height: '12px',
    },
};

export const NoLabel: Story = {
    name: 'No Label / No Values',
    args: {
        value: 500,
        max: 1000,
        color: 'var(--accent)',
        showValues: false,
        height: '8px',
    },
};
