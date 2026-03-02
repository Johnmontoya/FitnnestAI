import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../../shared/ui/Button';

/**
 * `Button` is the primary interactive element of the FitnnestAI design system.
 * It supports four visual variants and three sizes, following the Biopunk Athletic aesthetic
 * with Syne typography and neon-lime accent colours.
 */
const meta: Meta<typeof Button> = {
    title: 'Shared UI/Button',
    component: Button,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        variant: {
            control: 'select',
            options: ['primary', 'secondary', 'outline', 'danger'],
            description: 'Visual style of the button',
            table: { defaultValue: { summary: 'primary' } },
        },
        size: {
            control: 'radio',
            options: ['sm', 'md', 'lg'],
            description: 'Size of the button',
            table: { defaultValue: { summary: 'md' } },
        },
        disabled: {
            control: 'boolean',
            description: 'Disable the button',
        },
        children: {
            control: 'text',
            description: 'Button label content',
        },
        onClick: { action: 'clicked' },
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        children: 'Iniciar Protocolo',
        variant: 'primary',
        size: 'md',
    },
};

export const Secondary: Story = {
    args: {
        children: 'Ver Historial',
        variant: 'secondary',
        size: 'md',
    },
};

export const Outline: Story = {
    args: {
        children: 'Ajustar Target',
        variant: 'outline',
        size: 'md',
    },
};

export const Danger: Story = {
    args: {
        children: 'Eliminar Registro',
        variant: 'danger',
        size: 'md',
    },
};

export const SmallPrimary: Story = {
    name: 'Size — Small',
    args: {
        children: 'Activar',
        variant: 'primary',
        size: 'sm',
    },
};

export const LargePrimary: Story = {
    name: 'Size — Large',
    args: {
        children: 'Comenzar Entrenamiento',
        variant: 'primary',
        size: 'lg',
    },
};

export const Disabled: Story = {
    args: {
        children: 'No Disponible',
        variant: 'primary',
        size: 'md',
        disabled: true,
    },
};
