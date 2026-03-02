import { LuActivity } from "react-icons/lu";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Header = () => {
    const navigate = useNavigate();
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const navItems = [
        { label: "Características", href: "#features" },
        { label: "Estadísticas", href: "#stats" },
        { label: "Testimonios", href: "#testimonials" },
        { label: "Acerca de", href: "#about" },
    ];

    return (
        <header
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 50,
                transition: 'all 0.3s ease',
                background: scrolled
                    ? 'rgba(8, 11, 8, 0.85)'
                    : 'transparent',
                backdropFilter: scrolled ? 'blur(20px)' : 'none',
                WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
                borderBottom: scrolled
                    ? '1px solid rgba(198,241,53,0.12)'
                    : '1px solid transparent',
            }}
        >
            <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '68px' }}>

                    {/* Logo */}
                    <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
                        <div style={{
                            width: '34px',
                            height: '34px',
                            background: 'var(--accent)',
                            borderRadius: '8px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                        }}>
                            <LuActivity style={{ width: '18px', height: '18px', color: '#0a0a0a', strokeWidth: 2.5 }} />
                        </div>
                        <span style={{
                            fontFamily: 'Syne, sans-serif',
                            fontWeight: 800,
                            fontSize: '1.15rem',
                            letterSpacing: '0.06em',
                            color: 'var(--text)',
                            textTransform: 'uppercase',
                        }}>
                            Fitnest<span style={{ color: 'var(--accent)' }}>AI</span>
                        </span>
                    </Link>

                    {/* Nav */}
                    <nav style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                        {navItems.map((item) => (
                            <a
                                key={item.label}
                                href={item.href}
                                style={{
                                    color: 'var(--text-muted)',
                                    textDecoration: 'none',
                                    fontSize: '0.875rem',
                                    fontWeight: 500,
                                    letterSpacing: '0.01em',
                                    transition: 'color 0.2s',
                                    position: 'relative',
                                    paddingBottom: '2px',
                                }}
                                onMouseEnter={e => {
                                    (e.target as HTMLElement).style.color = 'var(--text)';
                                }}
                                onMouseLeave={e => {
                                    (e.target as HTMLElement).style.color = 'var(--text-muted)';
                                }}
                            >
                                {item.label}
                            </a>
                        ))}
                    </nav>

                    {/* Auth Buttons */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <button
                            onClick={() => navigate('/login')}
                            style={{
                                background: 'none',
                                border: 'none',
                                color: 'var(--text-muted)',
                                fontSize: '0.875rem',
                                fontWeight: 500,
                                cursor: 'pointer',
                                transition: 'color 0.2s',
                                padding: '0.5rem 0.75rem',
                            }}
                            onMouseEnter={e => ((e.target as HTMLElement).style.color = 'var(--text)')}
                            onMouseLeave={e => ((e.target as HTMLElement).style.color = 'var(--text-muted)')}
                        >
                            Iniciar sesión
                        </button>
                        <button
                            onClick={() => navigate('/register')}
                            className="btn-primary"
                            style={{ padding: '0.6rem 1.4rem', fontSize: '0.85rem' }}
                        >
                            Comenzar gratis
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;