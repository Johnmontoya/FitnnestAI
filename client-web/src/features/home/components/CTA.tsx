import { useNavigate } from "react-router-dom";

const CTA = () => {
    const navigate = useNavigate();

    return (
        <section style={{ padding: '5rem 1.5rem' }}>
            <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
                <div
                    className="aurora-bg py-12! px-6! sm:py-20! sm:px-16!"
                    style={{
                        borderRadius: '28px',
                        textAlign: 'center',
                        border: '1px solid var(--border-mid)',
                        background: 'var(--bg-card)',
                        position: 'relative',
                        overflow: 'hidden',
                    }}
                >
                    {/* Accent corner decoration */}
                    <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: '3px',
                        background: 'linear-gradient(90deg, transparent, var(--accent), transparent)',
                    }} />

                    <div style={{ position: 'relative', zIndex: 1 }}>
                        <p style={{
                            fontFamily: 'Syne, sans-serif',
                            fontWeight: 700,
                            fontSize: '0.72rem',
                            letterSpacing: '0.2em',
                            textTransform: 'uppercase',
                            color: 'var(--accent)',
                            marginBottom: '1.25rem',
                        }}>
                            Comienza Hoy
                        </p>

                        <h2 className="p-2!" style={{
                            fontFamily: 'Syne, sans-serif',
                            fontWeight: 800,
                            fontSize: 'clamp(2.2rem, 5vw, 4rem)',
                            lineHeight: 1.1,
                            letterSpacing: '-0.04em',
                            color: 'var(--text)',
                            marginBottom: '1.5rem',
                        }}>
                            Listo para tu<br />
                            <span style={{ color: 'var(--accent)' }}>Viaje de Transformación</span>?
                        </h2>

                        <p style={{
                            color: 'var(--text-muted)',
                            fontSize: '1.1rem',
                            lineHeight: 1.7,
                            maxWidth: '560px',
                            margin: '0 auto 3rem',
                        }}>
                            Únete a miles de atletas que ya optimizan su rendimiento con nuestra tecnología. El futuro de tu salud comienza hoy.
                        </p>

                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '1.25rem',
                        }}
                            className="flex-col sm:flex-row"
                        >
                            <button
                                onClick={() => navigate('/register')}
                                className="btn-primary"
                                style={{ fontSize: '1rem', padding: '1.1rem 3rem', minWidth: '220px' }}
                            >
                                Registrarse Ahora
                            </button>
                            <button
                                style={{
                                    background: 'none',
                                    border: '1px solid var(--border-mid)',
                                    color: 'var(--text)',
                                    fontFamily: 'DM Sans, sans-serif',
                                    fontWeight: 600,
                                    fontSize: '1rem',
                                    padding: '1.1rem 3rem',
                                    borderRadius: 'var(--radius-md)',
                                    cursor: 'pointer',
                                    transition: 'all 0.25s ease',
                                    minWidth: '220px',
                                }}
                                onMouseEnter={e => {
                                    const el = e.currentTarget as HTMLElement;
                                    el.style.borderColor = 'var(--accent)';
                                    el.style.background = 'rgba(198,241,53,0.05)';
                                    el.style.transform = 'translateY(-2px)';
                                }}
                                onMouseLeave={e => {
                                    const el = e.currentTarget as HTMLElement;
                                    el.style.borderColor = 'var(--border-mid)';
                                    el.style.background = 'none';
                                    el.style.transform = 'translateY(0)';
                                }}
                            >
                                Saber Más
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CTA;