import type { Meta, StoryObj } from '@storybook/react-vite';
import StatsFood from '../../../features/food/components/StatsFood';

/**
 * `StatsFood` shows a 4-card grid (Desayuno, Almuerzo, Cena, Snacks)
 * with the kcal consumed per meal, colour-coded by meal type.
 */
const meta: Meta<typeof StatsFood> = {
    title: 'Features/Food/StatsFood',
    component: StatsFood,
    parameters: {
        layout: 'padded',
        backgrounds: { default: 'dark' },
    },
    tags: ['autodocs'],
    argTypes: {
        mealTotals: { control: 'object' },
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const FullDay: Story = {
    name: 'Día Completo',
    args: {
        mealTotals: {
            breakfast: 420,
            lunch: 650,
            dinner: 510,
            snacks: 210,
        },
    },
};

export const BreakfastOnly: Story = {
    name: 'Solo Desayuno',
    args: {
        mealTotals: {
            breakfast: 380,
            lunch: 0,
            dinner: 0,
            snacks: 0,
        },
    },
};

export const Empty: Story = {
    name: 'Sin Registros',
    args: {
        mealTotals: {
            breakfast: 0,
            lunch: 0,
            dinner: 0,
            snacks: 0,
        },
    },
};

export const HighCalorieDay: Story = {
    name: 'Día Alto en Calorías',
    args: {
        mealTotals: {
            breakfast: 800,
            lunch: 1200,
            dinner: 750,
            snacks: 450,
        },
    },
};
