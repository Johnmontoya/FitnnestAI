import type { Meta, StoryObj } from '@storybook/react-vite';
import NavigationTab from '../../../features/profile/components/NavigationTab';
import { useState } from 'react';

/**
 * `NavigationTab` is the tab bar on the Profile page, switching between
 * "Biometría & Identidad" and "Bio-Protocolos" sections.
 */
const meta: Meta<typeof NavigationTab> = {
    title: 'Features/Profile/NavigationTab',
    component: NavigationTab,
    parameters: {
        layout: 'padded',
        backgrounds: { default: 'dark' },
    },
    tags: ['autodocs'],
    argTypes: {
        activeTab: {
            control: 'select',
            options: ['details', 'goals'],
            description: 'Currently active tab id',
        },
        setActiveTab: { action: 'tab changed' },
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const DetailsActive: Story = {
    name: 'Tab — Biometría activa',
    args: {
        activeTab: 'details',
    },
};

export const GoalsActive: Story = {
    name: 'Tab — Bio-Protocolos activo',
    args: {
        activeTab: 'goals',
    },
};

export const Interactive: Story = {
    name: 'Interactivo',
    render: () => {
        const [tab, setTab] = useState('details');
        return (
            <div style={{ padding: '2rem' }}>
                <NavigationTab activeTab={tab} setActiveTab={setTab} />
                <p style={{ color: 'var(--text-muted)', fontFamily: 'DM Sans, sans-serif', marginTop: '1.5rem', fontSize: '0.85rem' }}>
                    Tab activo: <strong style={{ color: 'var(--accent)' }}>{tab}</strong>
                </p>
            </div>
        );
    },
};
