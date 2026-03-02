import { useNavigate } from "react-router-dom";

const CTA = () => {
    const navigate = useNavigate();

    return (
        <section style={{ padding: '5rem 1.5rem' }}>
            <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
                <div
                    className="aurora-bg"
                    style={{
                        borderRadius: '28px',
                        padding: '5rem 4rem',
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

                        <h2 style={{
                            fontFamily: 'Syne, sans-serif',
                            fontWeight: 800,
                            fontSize: 'clamp(2.2rem, 4vw, 3.5rem)',
                            lineHeight: 1.1,
                            letterSpacing: '-0.02em',
                            color: 'var(--text)',
                            marginBottom: '1.25rem',
                        }}>
                            Listo para comenzar tu<br />
                            <span style={{ color: 'var(--accent)' }}>viaje de transformación</span>?
                        </h2>

                        <p style={{
                            color: 'var(--text-muted)',
                            fontSize: '1.05rem',
                            lineHeight: 1.7,
                            maxWidth: '520px',
                            margin: '0 auto 2.5rem',
                        }}>
                            Únete a miles de personas que han simplificado su fitness y logrado el cuerpo que siempre quisieron.
                        </p>

                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '1rem',
                            flexWrap: 'wrap',
                        }}>
                            <button
                                onClick={() => navigate('/register')}
                                className="btn-primary"
                                style={{ fontSize: '1rem', padding: '1rem 2.5rem' }}
                            >
                                Empezar gratis
                            </button>
                            <button
                                style={{
                                    background: 'none',
                                    border: '1px solid var(--border-mid)',
                                    color: 'var(--text)',
                                    fontFamily: 'DM Sans, sans-serif',
                                    fontWeight: 600,
                                    fontSize: '1rem',
                                    padding: '1rem 2.5rem',
                                    borderRadius: 'var(--radius-md)',
                                    cursor: 'pointer',
                                    transition: 'border-color 0.2s, background 0.2s',
                                }}
                                onMouseEnter={e => {
                                    const el = e.currentTarget as HTMLElement;
                                    el.style.borderColor = 'var(--accent)';
                                    el.style.background = 'rgba(198,241,53,0.05)';
                                }}
                                onMouseLeave={e => {
                                    const el = e.currentTarget as HTMLElement;
                                    el.style.borderColor = 'var(--border-mid)';
                                    el.style.background = 'none';
                                }}
                            >
                                Ver precios
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CTA;