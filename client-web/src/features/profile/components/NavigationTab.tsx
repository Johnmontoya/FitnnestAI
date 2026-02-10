import { BiUser } from "react-icons/bi";
import { FiTarget } from "react-icons/fi";
import { LuActivity, LuLock } from "react-icons/lu";

interface NavigationTabProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
}

const NavigationTab = ({ activeTab, setActiveTab }: NavigationTabProps) => {

    const tabs = [
        { id: 'details', label: 'Detalles', icon: BiUser },
        { id: 'goals', label: 'Objetivos', icon: FiTarget },
        { id: 'history', label: 'Historial', icon: LuActivity },
        { id: 'security', label: 'Seguridad', icon: LuLock },
    ];
    return (
        <div className="mb-6 border-b border-[#2a4a2a]">
            <div className="flex gap-1">
                {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 px-6 py-3 font-medium transition-all rounded-t-lg ${activeTab === tab.id
                                ? 'bg-emerald-500 text-black'
                                : 'text-gray-400 hover:text-white hover:bg-[#1a2f1a]'
                                }`}
                        >
                            <Icon className="w-4 h-4" />
                            {tab.label}
                        </button>
                    );
                })}
            </div>
        </div>
    )
}

export default NavigationTab;