import { BsInstagram, BsLinkedin, BsTwitterX } from "react-icons/bs";
import { LuActivity } from "react-icons/lu";

const footerLinks = [
    {
        title: "Producto",
        links: ["Características", "Integraciones", "Precios", "Cambios"],
    },
    {
        title: "Recursos",
        links: ["Comunidad", "Blog", "FAQ", "API"],
    },
    {
        title: "Legal",
        links: ["Privacidad", "Términos", "Cookies"],
    },
];

const Footer = () => {
    return (
        <footer style={{
            borderTop: '1px solid var(--border)',
            padding: '4rem 1.5rem 2.5rem',
        }}>
            {/* Top accent line */}
            <div style={{
                maxWidth: '1280px',
                margin: '0 auto',
            }}>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-16 px-4 md:px-0">
                    {/* Brand Section */}
                    <div className="lg:col-span-2">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.25rem' }}>
                            <div style={{
                                width: '34px', height: '34px',
                                background: 'var(--accent)', borderRadius: '8px',
                                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                            }}>
                                <LuActivity style={{ width: '18px', height: '18px', color: '#0a0a0a', strokeWidth: 2.5 }} />
                            </div>
                            <span style={{
                                fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '1.1rem',
                                letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--text)',
                            }}>
                                Fitnest<span style={{ color: 'var(--accent)' }}>AI</span>
                            </span>
                        </div>
                        <p style={{
                            color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.7,
                            maxWidth: '320px', marginBottom: '2rem',
                        }}>
                            Plataforma integral de fitness potenciada por IA. Transforma tus datos en resultados tangibles y alcanza tu máximo potencial.
                        </p>
                        {/* Social icons */}
                        <div style={{ display: 'flex', gap: '12px' }}>
                            {[
                                { Icon: BsInstagram, href: '#' },
                                { Icon: BsTwitterX, href: '#' },
                                { Icon: BsLinkedin, href: '#' },
                            ].map(({ Icon, href }, i) => (
                                <a key={i} href={href}
                                    style={{
                                        width: '40px', height: '40px',
                                        background: 'var(--bg-elevated)', border: '1px solid var(--border)',
                                        borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        color: 'var(--text-muted)', textDecoration: 'none',
                                        transition: 'all 0.3s cubic-bezier(0.22, 1, 0.36, 1)',
                                    }}
                                    className="hover:-translate-y-1"
                                    onMouseEnter={e => {
                                        const el = e.currentTarget as HTMLElement;
                                        el.style.color = 'var(--accent)';
                                        el.style.borderColor = 'rgba(198,241,53,0.3)';
                                        el.style.background = 'rgba(198,241,53,0.07)';
                                    }}
                                    onMouseLeave={e => {
                                        const el = e.currentTarget as HTMLElement;
                                        el.style.color = 'var(--text-muted)';
                                        el.style.borderColor = 'var(--border)';
                                        el.style.background = 'var(--bg-elevated)';
                                    }}
                                >
                                    <Icon style={{ width: '16px', height: '16px' }} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Link columns */}
                    {footerLinks.map((col) => (
                        <div key={col.title}>
                            <h3 style={{
                                fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '0.8rem',
                                letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text)',
                                marginBottom: '1.5rem',
                            }}>
                                {col.title}
                            </h3>
                            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                                {col.links.map((link) => (
                                    <li key={link}>
                                        <a href="#" style={{
                                            color: 'var(--text-muted)', textDecoration: 'none',
                                            fontSize: '0.9rem', transition: 'color 0.2s',
                                        }}
                                            onMouseEnter={e => ((e.target as HTMLElement).style.color = 'var(--text)')}
                                            onMouseLeave={e => ((e.target as HTMLElement).style.color = 'var(--text-muted)')}
                                        >
                                            {link}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bottom bar */}
                <div className="pt-8 border-t border-[var(--border)] flex flex-col md:flex-row items-center justify-between gap-6 px-4 md:px-0">
                    <p style={{ color: 'var(--text-subtle)', fontSize: '0.85rem' }}>
                        © 2026 FitnestAI. Todos los derechos reservados.
                    </p>
                    <div style={{ display: 'flex', gap: '2rem' }}>
                        <p style={{ color: 'var(--text-subtle)', fontSize: '0.85rem', cursor: 'pointer' }}>Privacidad</p>
                        <p style={{ color: 'var(--text-subtle)', fontSize: '0.85rem', cursor: 'pointer' }}>Términos</p>
                        <p style={{
                            color: 'var(--text-subtle)', fontSize: '0.85rem',
                            fontFamily: 'Syne, sans-serif', fontWeight: 600, letterSpacing: '0.06em',
                        }}>
                            <span style={{ color: 'var(--accent)' }}>●</span> GLOBAL
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;