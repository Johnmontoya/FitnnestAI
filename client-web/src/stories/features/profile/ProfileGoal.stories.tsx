import type { Meta, StoryObj } from '@storybook/react-vite';
import ProfileGoal from '../../../features/profile/components/ProfileGoal';

/**
 * `ProfileGoal` displays the user's AI-generated nutritional targets
 * (calories, protein, carbs, fats, hydration) derived from biometric data.
 *
 * The component accepts a `user` object and internally calls `calculateData(user)`
 * to compute the targets.
 */
const meta: Meta<typeof ProfileGoal> = {
    title: 'Features/Profile/ProfileGoal',
    component: ProfileGoal,
    parameters: {
        layout: 'centered',
        backgrounds: { default: 'dark' },
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const mockUserLose = {
    id: '1',
    name: 'Alex Montoya',
    email: 'alex@fitnnest.ai',
    weight: 82,
    height: 178,
    age: 28,
    gender: 'MALE',
    goal: 'LOSE',
    activityLevel: 'MODERATE',
};

const mockUserGain = {
    ...mockUserLose,
    goal: 'GAIN',
    activityLevel: 'HIGH',
    weight: 70,
};

const mockUserMaintain = {
    ...mockUserLose,
    goal: 'MAINTAIN',
    activityLevel: 'LOW',
    weight: 65,
    gender: 'FEMALE',
};

export const LoseWeight: Story = {
    name: 'Objetivo — Perder Peso',
    args: {
        user: mockUserLose,
    },
    decorators: [
        (Story) => (
            <div style={{ width: '380px' }}>
                <Story />
            </div>
        ),
    ],
};

export const GainMuscle: Story = {
    name: 'Objetivo — Ganar Músculo',
    args: {
        user: mockUserGain,
    },
    decorators: [
        (Story) => (
            <div style={{ width: '380px' }}>
                <Story />
            </div>
        ),
    ],
};

export const Maintain: Story = {
    name: 'Objetivo — Mantener',
    args: {
        user: mockUserMaintain,
    },
    decorators: [
        (Story) => (
            <div style={{ width: '380px' }}>
                <Story />
            </div>
        ),
    ],
};
