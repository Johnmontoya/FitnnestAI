import { LuActivity, LuMenu, LuX } from "react-icons/lu";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Header = () => {
    const navigate = useNavigate();
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    // Close menu on resize to desktop
    useEffect(() => {
        const onResize = () => { if (window.innerWidth >= 768) setMobileOpen(false); };
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, []);

    const navItems = [
        { label: "Características", href: "#features" },
        { label: "Estadísticas", href: "#stats" },
        { label: "Testimonios", href: "#testimonials" },
        { label: "Acerca de", href: "#about" },
    ];

    const navLinkStyle: React.CSSProperties = {
        color: 'var(--text-muted)',
        textDecoration: 'none',
        fontSize: '0.875rem',
        fontWeight: 500,
        letterSpacing: '0.01em',
        transition: 'color 0.2s',
        position: 'relative',
        paddingBottom: '2px',
    };

    return (
        <>
            <header
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    zIndex: 50,
                    transition: 'all 0.3s ease',
                    background: scrolled || mobileOpen
                        ? 'rgba(8, 11, 8, 0.95)'
                        : 'transparent',
                    backdropFilter: scrolled || mobileOpen ? 'blur(20px)' : 'none',
                    WebkitBackdropFilter: scrolled || mobileOpen ? 'blur(20px)' : 'none',
                    borderBottom: scrolled || mobileOpen
                        ? '1px solid rgba(198,241,53,0.12)'
                        : '1px solid transparent',
                }}
            >
                <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '68px' }}>

                        {/* Logo */}
                        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
                            <div style={{
                                width: '34px', height: '34px',
                                background: 'var(--accent)', borderRadius: '8px',
                                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                            }}>
                                <LuActivity style={{ width: '18px', height: '18px', color: '#0a0a0a', strokeWidth: 2.5 }} />
                            </div>
                            <span style={{
                                fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '1.15rem',
                                letterSpacing: '0.06em', color: 'var(--text)', textTransform: 'uppercase',
                            }}>
                                Fitnest<span style={{ color: 'var(--accent)' }}>AI</span>
                            </span>
                        </Link>

                        {/* Desktop Nav */}
                        <nav className="hidden md:flex" style={{ alignItems: 'center', gap: '2rem' }}>
                            {navItems.map((item) => (
                                <a key={item.label} href={item.href} style={navLinkStyle}
                                    onMouseEnter={e => { (e.target as HTMLElement).style.color = 'var(--text)'; }}
                                    onMouseLeave={e => { (e.target as HTMLElement).style.color = 'var(--text-muted)'; }}
                                >
                                    {item.label}
                                </a>
                            ))}
                        </nav>

                        {/* Desktop Auth Buttons */}
                        <div className="hidden md:flex" style={{ alignItems: 'center', gap: '1rem' }}>
                            <button onClick={() => navigate('/login')}
                                style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: '0.875rem', fontWeight: 500, cursor: 'pointer', transition: 'color 0.2s', padding: '0.5rem 0.75rem' }}
                                onMouseEnter={e => ((e.target as HTMLElement).style.color = 'var(--text)')}
                                onMouseLeave={e => ((e.target as HTMLElement).style.color = 'var(--text-muted)')}
                            >
                                Iniciar sesión
                            </button>
                            <button onClick={() => navigate('/register')} className="btn-primary" style={{ padding: '0.6rem 1.4rem', fontSize: '0.85rem' }}>
                                Comenzar gratis
                            </button>
                        </div>

                        {/* Mobile Hamburger */}
                        <button
                            className="flex md:hidden"
                            onClick={() => setMobileOpen(!mobileOpen)}
                            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text)', padding: '0.5rem' }}
                            aria-label="Toggle menu"
                        >
                            {mobileOpen
                                ? <LuX style={{ width: '24px', height: '24px' }} />
                                : <LuMenu style={{ width: '24px', height: '24px' }} />
                            }
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {mobileOpen && (
                    <div className="flex md:hidden" style={{
                        flexDirection: 'column',
                        padding: '1rem 1.5rem 1.5rem',
                        borderTop: '1px solid rgba(198,241,53,0.1)',
                        gap: '0.25rem',
                    }}>
                        {navItems.map((item) => (
                            <a key={item.label} href={item.href}
                                onClick={() => setMobileOpen(false)}
                                style={{
                                    ...navLinkStyle,
                                    display: 'block',
                                    padding: '0.75rem 0',
                                    fontSize: '1rem',
                                    borderBottom: '1px solid rgba(255,255,255,0.05)',
                                }}
                            >
                                {item.label}
                            </a>
                        ))}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '1.25rem' }}>
                            <button onClick={() => { navigate('/login'); setMobileOpen(false); }}
                                style={{ background: 'none', border: '1px solid var(--border-mid)', color: 'var(--text)', fontFamily: 'DM Sans, sans-serif', fontWeight: 600, fontSize: '0.95rem', padding: '0.8rem', borderRadius: 'var(--radius-md)', cursor: 'pointer' }}
                            >
                                Iniciar sesión
                            </button>
                            <button onClick={() => { navigate('/register'); setMobileOpen(false); }} className="btn-primary" style={{ fontSize: '0.95rem', padding: '0.8rem' }}>
                                Comenzar gratis
                            </button>
                        </div>
                    </div>
                )}
            </header>
        </>
    );
};

export default Header;
