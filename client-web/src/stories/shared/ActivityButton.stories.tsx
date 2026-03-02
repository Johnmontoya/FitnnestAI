import type { Meta, StoryObj } from '@storybook/react-vite';
import { ActivityButton } from '../../shared/ui/ActivityButton';
import { BiCycling, BiDumbbell, BiWalk, BiSwim } from 'react-icons/bi';

/**
 * `ActivityButton` is a selectable tile used in the activity logging form,
 * featuring an emoji or icon, activity name, and optional calorie rate.
 */
const meta: Meta<typeof ActivityButton> = {
    title: 'Shared UI/ActivityButton',
    component: ActivityButton,
    parameters: { layout: 'centered' },
    tags: ['autodocs'],
    argTypes: {
        name: { control: 'text' },
        emoji: { control: 'text' },
        rate: { control: 'text' },
        selected: { control: 'boolean' },
        onClick: { action: 'clicked' },
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const WithEmojiUnselected: Story = {
    name: 'Emoji — Unselected',
    args: {
        name: 'Correr',
        emoji: '🏃',
        rate: '11',
        selected: false,
    },
};

export const WithEmojiSelected: Story = {
    name: 'Emoji — Selected',
    args: {
        name: 'Correr',
        emoji: '🏃',
        rate: '11',
        selected: true,
    },
};

export const WithIconUnselected: Story = {
    name: 'Icon — Unselected',
    args: {
        name: 'Ciclismo',
        icon: BiCycling,
        rate: '8',
        selected: false,
    },
};

export const WithIconSelected: Story = {
    name: 'Icon — Selected',
    args: {
        name: 'Gym',
        icon: BiDumbbell,
        rate: '7',
        selected: true,
    },
};

export const GridPreview: Story = {
    render: () => {
        const activities = [
            { name: 'Correr', emoji: '🏃', rate: '11' },
            { name: 'Ciclismo', Icon: BiCycling, rate: '8' },
            { name: 'Gym', Icon: BiDumbbell, rate: '7' },
            { name: 'Caminar', Icon: BiWalk, rate: '5' },
            { name: 'Natación', Icon: BiSwim, rate: '9' },
            { name: 'Cardio', emoji: '🔥', rate: '10' },
        ];

        return (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
                {activities.map((a, i) => (
                    <ActivityButton
                        key={a.name}
                        name={a.name}
                        emoji={a.emoji}
                        icon={a.Icon}
                        rate={a.rate}
                        onClick={() => { }}
                        selected={i === 0}
                    />
                ))}
            </div>
        );
    },
};
