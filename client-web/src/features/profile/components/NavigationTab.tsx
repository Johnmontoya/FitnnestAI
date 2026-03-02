import { BiPlanet, BiDumbbell } from "react-icons/bi";

interface NavigationTabProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
}

const NavigationTab = ({ activeTab, setActiveTab }: NavigationTabProps) => {
    const tabs = [
        { id: 'details', label: 'Biometría & Identidad', icon: BiPlanet },
        { id: 'goals', label: 'Bio-Protocolos', icon: BiDumbbell },
    ];

    return (
        <div className="flex items-center gap-8 border-b border-white/5">
            {tabs.map((tab) => (
                <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`relative pb-4! flex items-center gap-3 transition-all ${activeTab === tab.id
                        ? 'text-white'
                        : 'text-[var(--text-muted)] hover:text-[var(--text-subtle)]'
                        }`}
                >
                    <tab.icon className={`text-xl ${activeTab === tab.id ? 'text-[var(--accent)]' : ''}`} />
                    <span className="font-display font-bold text-sm tracking-widest uppercase">
                        {tab.label}
                    </span>

                    {activeTab === tab.id && (
                        <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[var(--accent)] to-white rounded-full shadow-[0_-4px_12px_var(--accent-glow)]"></div>
                    )}
                </button>
            ))}
        </div>
    );
};

export default NavigationTab;