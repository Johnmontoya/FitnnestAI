import type { Meta, StoryObj } from '@storybook/react-vite';
import { Card, CardHeader, CardTitle, CardContent } from '../../shared/ui/Card';

/**
 * `Card` is the main surface container used throughout FitnnestAI,
 * with an optional accent border for highlighted sections.
 */
const meta: Meta<typeof Card> = {
    title: 'Shared UI/Card',
    component: Card,
    parameters: { layout: 'centered' },
    tags: ['autodocs'],
    argTypes: {
        accent: {
            control: 'boolean',
            description: 'Highlights the card with a neon-lime border',
        },
        padding: {
            control: 'text',
            description: 'Tailwind padding utility class',
            table: { defaultValue: { summary: 'p-6' } },
        },
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        accent: false,
        children: (
            <p style={{ color: 'var(--text-muted)', fontFamily: 'DM Sans, sans-serif' }}>
                Contenido de la tarjeta básica
            </p>
        ),
    },
};

export const WithAccent: Story = {
    name: 'Accent Border',
    args: {
        accent: true,
        children: (
            <p style={{ color: 'var(--text-muted)', fontFamily: 'DM Sans, sans-serif' }}>
                Tarjeta con borde neon-lime resaltado
            </p>
        ),
    },
};

export const WithHeaderAndContent: Story = {
    name: 'With Header & Content',
    render: () => (
        <div style={{ width: '360px' }}>
            <Card>
                <CardHeader>
                    <CardTitle>Estadísticas del Día</CardTitle>
                </CardHeader>
                <CardContent>
                    <p style={{ color: 'var(--text-subtle)', fontFamily: 'DM Sans, sans-serif', fontSize: '0.9rem' }}>
                        Hoy has quemado 820 kcal y completado 7,430 pasos.
                    </p>
                </CardContent>
            </Card>
        </div>
    ),
};
