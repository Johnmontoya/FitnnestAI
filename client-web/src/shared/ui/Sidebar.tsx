import { LuActivity, LuLayoutDashboard, LuUser, LuUtensilsCrossed, LuLogOut } from 'react-icons/lu';
import { NavLink } from 'react-router-dom';
import { useAuthStore } from '../../features/auth/store/useAuthStore';

const menuItems = [
    { icon: LuLayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: LuActivity, label: 'Actividad', path: '/activity' },
    { icon: LuUtensilsCrossed, label: 'Nutrición', path: '/nutrition' },
    { icon: LuUser, label: 'Perfil', path: '/profile' },
];

export const Sidebar = () => {
    const { logout } = useAuthStore();

    return (
        <aside className='w-20 lg:w-64 h-min-screen' style={{
            background: 'var(--bg-surface)',
            borderRight: '1px solid var(--border)',
            position: 'relative',
            left: 0,
            top: 0,
            display: 'flex',
            flexDirection: 'column',
        }}>
            {/* Logo */}
            <div style={{
                padding: '1.5rem 1.25rem',
                borderBottom: '1px solid var(--border)',
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{
                        width: '28px',
                        height: '28px',
                        background: 'var(--accent)',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                    }}>
                        <LuActivity style={{ width: '18px', height: '18px', color: '#0a0a0a', strokeWidth: 2.5 }} />
                    </div>
                    <span className='hidden lg:flex' style={{
                        fontFamily: 'Syne, sans-serif',
                        fontWeight: 800,
                        fontSize: '1rem',
                        letterSpacing: '0.06em',
                        textTransform: 'uppercase',
                        color: 'var(--text)',
                    }}>
                        Fitnest<span style={{ color: 'var(--accent)' }}>AI</span>
                    </span>
                </div>
            </div>

            {/* Navigation label */}
            <div style={{ padding: '1.5rem 1.25rem 0.5rem' }}>
                <p style={{
                    fontFamily: 'Syne, sans-serif',
                    fontWeight: 700,
                    fontSize: '0.5rem',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    color: 'var(--text-subtle)',
                }}>
                    Menú
                </p>
            </div>

            {/* Navigation */}
            <nav style={{ flex: 1, padding: '0.5rem 0.75rem' }}>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '2px' }}>
                    {menuItems.map((item) => (
                        <li key={item.path}>
                            <NavLink
                                to={item.path}
                                style={({ isActive }) => ({
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '12px',
                                    padding: '0.7rem 0.9rem',
                                    borderRadius: '10px',
                                    textDecoration: 'none',
                                    fontFamily: 'DM Sans, sans-serif',
                                    fontWeight: isActive ? 600 : 500,
                                    fontSize: '0.9rem',
                                    color: isActive ? '#0a0a0a' : 'var(--text-muted)',
                                    background: isActive ? 'var(--accent)' : 'transparent',
                                    borderLeft: isActive ? 'none' : '2px solid transparent',
                                    transition: 'all 0.2s',
                                    position: 'relative',
                                })}
                            >
                                {({ isActive }) => (
                                    <>
                                        <item.icon style={{
                                            width: '18px',
                                            height: '18px',
                                            color: isActive ? '#0a0a0a' : 'var(--text-subtle)',
                                            flexShrink: 0,
                                        }} />
                                        <span className='hidden lg:flex'>{item.label}</span>
                                        {isActive && (
                                            <div style={{
                                                position: 'absolute',
                                                right: '0.75rem',
                                                width: '6px',
                                                height: '6px',
                                                borderRadius: '50%',
                                                background: 'rgba(0,0,0,0.4)',
                                            }} />
                                        )}
                                    </>
                                )}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>

            {/* Logout */}
            <div style={{
                padding: '1rem 0.75rem',
                borderTop: '1px solid var(--border)',
            }}>
                <button
                    onClick={() => logout()}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        width: '100%',
                        padding: '0.7rem 0.9rem',
                        background: 'none',
                        border: '1px solid var(--border)',
                        borderRadius: '10px',
                        color: 'var(--text-muted)',
                        fontFamily: 'DM Sans, sans-serif',
                        fontWeight: 500,
                        fontSize: '0.9rem',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                    }}
                    onMouseEnter={e => {
                        const el = e.currentTarget as HTMLElement;
                        el.style.borderColor = 'rgba(239,68,68,0.4)';
                        el.style.color = '#f87171';
                        el.style.background = 'rgba(239,68,68,0.06)';
                    }}
                    onMouseLeave={e => {
                        const el = e.currentTarget as HTMLElement;
                        el.style.borderColor = 'var(--border)';
                        el.style.color = 'var(--text-muted)';
                        el.style.background = 'none';
                    }}
                >
                    <LuLogOut style={{ width: '16px', height: '16px', flexShrink: 0 }} />
                    <span className='hidden lg:flex'>Cerrar sesión</span>
                </button>
            </div>
        </aside>
    );
};