import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import MiModal from '../../shared/ui/Modal';
import { Button } from '../../shared/ui/Button';

/**
 * `Modal` (MiModal) is a full-screen overlay dialog with a header title and
 * closeable backdrop. Used for confirmations and quick-action forms.
 */
const meta: Meta<typeof MiModal> = {
    title: 'Shared UI/Modal',
    component: MiModal,
    parameters: { layout: 'fullscreen' },
    tags: ['autodocs'],
    argTypes: {
        isOpen: { control: 'boolean' },
        title: { control: 'text' },
        onClose: { action: 'closed' },
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Open: Story = {
    name: 'Abierto (con contenido)',
    args: {
        isOpen: true,
        title: 'Registrar Actividad',
        children: (
            <div style={{ color: 'var(--text-muted)', fontFamily: 'DM Sans, sans-serif' }}>
                <p>Selecciona el tipo de actividad y la duración para registrarla en tu historial de hoy.</p>
            </div>
        ),
    },
};

export const Closed: Story = {
    name: 'Cerrado',
    args: {
        isOpen: false,
        title: 'Registrar Actividad',
    },
    render: (args) => (
        <div style={{ padding: '2rem', color: 'var(--text-muted)', fontFamily: 'DM Sans, sans-serif' }}>
            <p>El modal está cerrado. Cambia <code>isOpen</code> en Controls a <code>true</code> para verlo.</p>
            <MiModal {...args} />
        </div>
    ),
};

export const Interactive: Story = {
    name: 'Interactivo (click para abrir)',
    render: () => {
        const [open, setOpen] = useState(false);
        return (
            <div style={{ padding: '4rem', display: 'flex', justifyContent: 'center' }}>
                <Button variant="primary" onClick={() => setOpen(true)}>Abrir Modal</Button>
                <MiModal
                    isOpen={open}
                    onClose={() => setOpen(false)}
                    title="Confirmar Eliminación"
                >
                    <p style={{ color: 'var(--text-muted)', fontFamily: 'DM Sans, sans-serif', marginBottom: '1.5rem' }}>
                        ¿Estás seguro de que deseas eliminar este registro de actividad?
                    </p>
                    <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                        <Button variant="secondary" onClick={() => setOpen(false)}>Cancelar</Button>
                        <Button variant="danger" onClick={() => setOpen(false)}>Eliminar</Button>
                    </div>
                </MiModal>
            </div>
        );
    },
};
