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
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '2fr 1fr 1fr 1fr',
                    gap: '3rem',
                    marginBottom: '3rem',
                }}>
                    {/* Brand */}
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
                            <div style={{
                                width: '32px', height: '32px',
                                background: 'var(--accent)',
                                borderRadius: '8px',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                flexShrink: 0,
                            }}>
                                <LuActivity style={{ width: '16px', height: '16px', color: '#0a0a0a', strokeWidth: 2.5 }} />
                            </div>
                            <span style={{
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
                        <p style={{
                            color: 'var(--text-muted)',
                            fontSize: '0.88rem',
                            lineHeight: 1.65,
                            maxWidth: '280px',
                            marginBottom: '1.5rem',
                        }}>
                            Tu compañero de fitness inteligente. Transforma hábitos, alcanza metas, supera límites.
                        </p>
                        {/* Social icons */}
                        <div style={{ display: 'flex', gap: '12px' }}>
                            {[
                                { Icon: BsInstagram, href: '#' },
                                { Icon: BsTwitterX, href: '#' },
                                { Icon: BsLinkedin, href: '#' },
                            ].map(({ Icon, href }, i) => (
                                <a
                                    key={i}
                                    href={href}
                                    style={{
                                        width: '36px', height: '36px',
                                        background: 'var(--bg-elevated)',
                                        border: '1px solid var(--border)',
                                        borderRadius: '8px',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        color: 'var(--text-muted)',
                                        textDecoration: 'none',
                                        transition: 'color 0.2s, border-color 0.2s, background 0.2s',
                                    }}
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
                                    <Icon style={{ width: '15px', height: '15px' }} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Link columns */}
                    {footerLinks.map((col) => (
                        <div key={col.title}>
                            <h3 style={{
                                fontFamily: 'Syne, sans-serif',
                                fontWeight: 700,
                                fontSize: '0.78rem',
                                letterSpacing: '0.12em',
                                textTransform: 'uppercase',
                                color: 'var(--text)',
                                marginBottom: '1.25rem',
                            }}>
                                {col.title}
                            </h3>
                            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
                                {col.links.map((link) => (
                                    <li key={link}>
                                        <a
                                            href="#"
                                            style={{
                                                color: 'var(--text-muted)',
                                                textDecoration: 'none',
                                                fontSize: '0.88rem',
                                                transition: 'color 0.2s',
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
                <div style={{
                    borderTop: '1px solid var(--border)',
                    paddingTop: '1.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}>
                    <p style={{ color: 'var(--text-subtle)', fontSize: '0.82rem' }}>
                        © 2026 FitnestAI. Todos los derechos reservados.
                    </p>
                    <p style={{
                        color: 'var(--text-subtle)',
                        fontSize: '0.82rem',
                        fontFamily: 'Syne, sans-serif',
                        fontWeight: 600,
                        letterSpacing: '0.06em',
                    }}>
                        <span style={{ color: 'var(--accent)' }}>●</span> 2026
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;