import type { Meta, StoryObj } from '@storybook/react-vite';
import StatsActivity from '../../../features/activity/components/StatsActivity';
import moment from 'moment';
import type { ActivityResponse } from '../../../features/activity/types/activity.types';

/**
 * `StatsActivity` renders three `StatCard`s for today's total steps,
 * active minutes, and calories burned — each compared to yesterday's data.
 */
const meta: Meta<typeof StatsActivity> = {
    title: 'Features/Activity/StatsActivity',
    component: StatsActivity,
    parameters: {
        layout: 'padded',
        backgrounds: { default: 'dark' },
    },
    tags: ['autodocs'],
    argTypes: {
        totalSteps: { control: 'number' },
        caloriesBurned: { control: 'number' },
        durationTime: { control: 'number' },
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

const today = moment().toISOString();
const yesterday = moment().subtract(1, 'days').toISOString();

const mockActivitiesGood: ActivityResponse[] = [
    { id: '1', name: 'Correr', calories: 520, duration: 45, date: today, createdAt: today, userId: 'u1', documentId: 'd1', updatedAt: today },
    { id: '2', name: 'Gym', calories: 300, duration: 40, date: yesterday, createdAt: yesterday, userId: 'u1', documentId: 'd2', updatedAt: yesterday },
];

const mockActivitiesBad: ActivityResponse[] = [
    { id: '3', name: 'Caminar', calories: 200, duration: 25, date: today, createdAt: today, userId: 'u1', documentId: 'd3', updatedAt: today },
    { id: '4', name: 'Correr', calories: 600, duration: 55, date: yesterday, createdAt: yesterday, userId: 'u1', documentId: 'd4', updatedAt: yesterday },
];

export const PositiveTrend: Story = {
    name: 'Tendencia Positiva',
    args: {
        activities: mockActivitiesGood,
        totalSteps: 7430,
        caloriesBurned: 820,
        durationTime: 85,
    },
};

export const NegativeTrend: Story = {
    name: 'Tendencia Negativa',
    args: {
        activities: mockActivitiesBad,
        totalSteps: 3200,
        caloriesBurned: 200,
        durationTime: 25,
    },
};

export const NoHistory: Story = {
    name: 'Sin Historial Previo',
    args: {
        activities: [],
        totalSteps: 5500,
        caloriesBurned: 450,
        durationTime: 60,
    },
};
