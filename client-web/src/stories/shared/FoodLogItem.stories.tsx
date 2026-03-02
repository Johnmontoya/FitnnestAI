import type { Meta, StoryObj } from '@storybook/react-vite';
import { FoodLogItem } from '../../shared/ui/FoodLogItem';

/**
 * `FoodLogItem` displays a single meal entry in the nutrition log,
 * with meal-type colours, macronutrient breakdown, and edit/delete actions.
 * The first delete click surfaces a confirmation nudge; the second confirms deletion.
 */
const meta: Meta<typeof FoodLogItem> = {
    title: 'Shared UI/FoodLogItem',
    component: FoodLogItem,
    parameters: { layout: 'centered' },
    tags: ['autodocs'],
    decorators: [
        (Story) => (
            <div style={{ width: '380px' }}>
                <Story />
            </div>
        ),
    ],
    argTypes: {
        name: { control: 'text' },
        calories: { control: 'number' },
        mealType: {
            control: 'select',
            options: ['BREAKFAST', 'LUNCH', 'DINNER', 'SNACK'],
        },
        proteinas: { control: 'number' },
        carbs: { control: 'number' },
        fats: { control: 'number' },
        portion: { control: 'number' },
        onEdit: { action: 'edit clicked' },
        onDelete: { action: 'delete confirmed' },
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Breakfast: Story = {
    name: 'Desayuno — Avena con Frutas',
    args: {
        name: 'Avena con Frutas y Miel',
        calories: 350,
        mealType: 'BREAKFAST',
        proteinas: 12,
        carbs: 58,
        fats: 6,
        portion: 250,
    },
};

export const Lunch: Story = {
    name: 'Almuerzo — Pechuga a la Plancha',
    args: {
        name: 'Pechuga de Pollo a la Plancha',
        calories: 480,
        mealType: 'LUNCH',
        proteinas: 52,
        carbs: 18,
        fats: 8,
        portion: 300,
    },
};

export const Dinner: Story = {
    name: 'Cena — Salmón al Horno',
    args: {
        name: 'Salmón al Horno con Espárragos',
        calories: 420,
        mealType: 'DINNER',
        proteinas: 38,
        carbs: 12,
        fats: 22,
        portion: 220,
    },
};

export const Snack: Story = {
    name: 'Snack — Almendras',
    args: {
        name: 'Almendras Naturales',
        calories: 180,
        mealType: 'SNACK',
        proteinas: 6,
        carbs: 6,
        fats: 15,
        portion: 30,
    },
};

export const WithoutMacros: Story = {
    name: 'Sin Macros',
    args: {
        name: 'Café Negro',
        calories: 5,
        mealType: 'BREAKFAST',
    },
};
