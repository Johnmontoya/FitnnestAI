import { LuActivity, LuLayoutDashboard, LuUser, LuUtensilsCrossed } from 'react-icons/lu';
import { NavLink } from 'react-router-dom';
import { Button } from './Button';
import { useAuthStore } from '../../features/auth/store/useAuthStore';

export const Sidebar = () => {
    const { logout } = useAuthStore();
    const menuItems = [
        { icon: LuLayoutDashboard, label: 'Dashboard', path: '/dashboard' },
        { icon: LuActivity, label: 'Activity', path: '/activity' },
        { icon: LuUtensilsCrossed, label: 'Nutrition', path: '/nutrition' },
        { icon: LuUser, label: 'Profile', path: '/profile' },
    ];

    return (
        <aside className="w-64 h-screen bg-[#0a150a] border-r border-[#1a2f1a] fixed left-0 top-0 flex flex-col">
            {/* Logo */}
            <div className="p-6 border-b border-[#1a2f1a]">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#00ff66] rounded-lg flex items-center justify-center">
                        <LuActivity className="w-6 h-6 text-black" />
                    </div>
                    <span className="text-white text-xl font-bold">VitalTrack</span>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4">
                <ul className="space-y-2">
                    {menuItems.map((item) => (
                        <li key={item.path}>
                            <NavLink
                                to={item.path}
                                className={({ isActive }) => `
                  flex items-center gap-3 px-4 py-3 rounded-xl transition-all
                  ${isActive
                                        ? 'bg-[#00ff66] text-black font-semibold'
                                        : 'text-gray-400 hover:bg-[#1a2f1a] hover:text-white'
                                    }
                `}
                            >
                                <item.icon className="w-5 h-5" />
                                <span>{item.label}</span>
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>

            {/* User Info */}
            <div className="p-4 border-t border-[#1a2f1a]">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-[#1a2f1a]">
                    <div className="w-10 h-10 bg-[#2a4a2a] rounded-full flex items-center justify-center">
                        <LuUser className="w-5 h-5 text-[#00ff66]" />
                    </div>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => logout()}
                        className="w-full"
                    >
                        Logout
                    </Button>
                </div>
            </div>
        </aside>
    );
};