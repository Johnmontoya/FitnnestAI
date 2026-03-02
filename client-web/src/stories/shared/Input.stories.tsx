import type { Meta, StoryObj } from '@storybook/react-vite';
import { Input, Select } from '../../shared/ui/Input';
import { BiUser, BiLock, BiSearch } from 'react-icons/bi';

// ─── INPUT ────────────────────────────────────────────────────────────────────

/**
 * `Input` is the primary text field component, featuring neon-lime focus rings
 * and optional leading icons for contextual guidance.
 */
const inputMeta: Meta<typeof Input> = {
    title: 'Shared UI/Input',
    component: Input,
    parameters: { layout: 'centered' },
    tags: ['autodocs'],
    argTypes: {
        label: { control: 'text' },
        placeholder: { control: 'text' },
        error: { control: 'text', description: 'Error message displayed below the input' },
        type: {
            control: 'select',
            options: ['text', 'email', 'password', 'number'],
        },
    },
    decorators: [
        (Story) => (
            <div style={{ width: '320px' }}>
                <Story />
            </div>
        ),
    ],
};

export default inputMeta;
type InputStory = StoryObj<typeof inputMeta>;

export const Default: InputStory = {
    args: {
        label: 'Nombre de Usuario',
        placeholder: 'Ingresa tu nombre...',
        type: 'text',
    },
};

export const WithIcon: InputStory = {
    name: 'With Icon',
    args: {
        label: 'Correo Electrónico',
        placeholder: 'holo@fitnnest.ai',
        type: 'email',
        icon: <BiUser size={16} />,
    },
};

export const Password: InputStory = {
    args: {
        label: 'Contraseña',
        placeholder: '••••••••',
        type: 'password',
        icon: <BiLock size={16} />,
    },
};

export const WithError: InputStory = {
    name: 'With Error',
    args: {
        label: 'Buscar Alimento',
        placeholder: 'Pollo asado...',
        icon: <BiSearch size={16} />,
        error: 'Debes ingresar al menos 3 caracteres',
    },
};

// ─── SELECT ───────────────────────────────────────────────────────────────────

/**
 * `Select` renders a styled native dropdown for choosing between options.
 */
export const SelectDefault: StoryObj = {
    name: 'Select — Default',
    render: () => (
        <div style={{ width: '320px' }}>
            <Select
                aria-label='Objetivo'
                label="Objetivo"
                options={[
                    { value: 'LOSE', label: 'Perder Peso' },
                    { value: 'GAIN', label: 'Ganar Músculo' },
                    { value: 'MAINTAIN', label: 'Mantener' },
                ]}
                placeholder="Seleccionar meta..."
            />
        </div>
    ),
};
