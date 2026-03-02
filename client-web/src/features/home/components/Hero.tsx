import { useNavigate } from "react-router-dom";
import heroImage from "../../../assets/hero.jpg";

const Hero = () => {
    const navigate = useNavigate();

    return (
        <section
            className="aurora-bg"
            style={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                paddingTop: '100px',
                paddingBottom: '80px',
                paddingLeft: '1.5rem',
                paddingRight: '1.5rem',
            }}
        >
            {/* Aurora layer already rendered via CSS ::before */}
            <div style={{ maxWidth: '1280px', margin: '0 auto', width: '100%', position: 'relative', zIndex: 1 }}>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '5rem',
                    alignItems: 'center',
                }}>

                    {/* LEFT — Text */}
                    <div>
                        {/* Badge */}
                        <div
                            className="animate-fade-up"
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '8px',
                                background: 'rgba(198,241,53,0.08)',
                                border: '1px solid rgba(198,241,53,0.22)',
                                borderRadius: '100px',
                                padding: '6px 14px',
                                marginBottom: '2rem',
                            }}
                        >
                            <span style={{
                                width: '6px', height: '6px',
                                borderRadius: '50%',
                                background: 'var(--accent)',
                                display: 'inline-block',
                                boxShadow: '0 0 8px var(--accent)',
                            }} />
                            <span style={{
                                fontFamily: 'Syne, sans-serif',
                                fontWeight: 700,
                                fontSize: '0.72rem',
                                letterSpacing: '0.1em',
                                textTransform: 'uppercase',
                                color: 'var(--accent)',
                            }}>
                                Tu Gurú Personal de Fitness IA
                            </span>
                        </div>

                        {/* Headline */}
                        <h1
                            className="animate-fade-up-delay-1 font-display"
                            style={{
                                fontSize: 'clamp(3.2rem, 6vw, 5.5rem)',
                                fontWeight: 800,
                                lineHeight: 1.0,
                                letterSpacing: '-0.03em',
                                color: 'var(--text)',
                                marginBottom: '1.5rem',
                            }}
                        >
                            Transforma<br />
                            Tu Cuerpo,<br />
                            <span style={{
                                color: 'var(--accent)',
                                position: 'relative',
                                display: 'inline-block',
                            }}>
                                Un Rep
                            </span>
                            {' '}a la vez
                        </h1>

                        <span className="accent-line animate-fade-up-delay-2" style={{ marginBottom: '1.75rem' }} />

                        <p
                            className="animate-fade-up-delay-2"
                            style={{
                                color: 'var(--text-muted)',
                                fontSize: '1.05rem',
                                lineHeight: 1.7,
                                maxWidth: '440px',
                                marginBottom: '2.5rem',
                            }}
                        >
                            Registra actividades, analiza tu nutrición y alcanza tus metas con inteligencia artificial. Diseñado para resultados reales.
                        </p>

                        {/* CTAs */}
                        <div
                            className="animate-fade-up-delay-3"
                            style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2.5rem' }}
                        >
                            <button
                                onClick={() => navigate('/register')}
                                className="btn-primary"
                                style={{ fontSize: '1rem', padding: '0.95rem 2.2rem' }}
                            >
                                Comenzar ahora →
                            </button>
                            <button
                                onClick={() => navigate('/login')}
                                style={{
                                    background: 'none',
                                    border: '1px solid var(--border-mid)',
                                    color: 'var(--text)',
                                    fontFamily: 'DM Sans, sans-serif',
                                    fontWeight: 600,
                                    fontSize: '1rem',
                                    padding: '0.95rem 2rem',
                                    borderRadius: 'var(--radius-md)',
                                    cursor: 'pointer',
                                    transition: 'border-color 0.2s, background 0.2s',
                                }}
                                onMouseEnter={e => {
                                    (e.currentTarget as HTMLElement).style.borderColor = 'var(--accent)';
                                    (e.currentTarget as HTMLElement).style.background = 'rgba(198,241,53,0.05)';
                                }}
                                onMouseLeave={e => {
                                    (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-mid)';
                                    (e.currentTarget as HTMLElement).style.background = 'none';
                                }}
                            >
                                Iniciar sesión
                            </button>
                        </div>

                        {/* Social proof */}
                        <div
                            className="animate-fade-up-delay-4"
                            style={{ display: 'flex', alignItems: 'center', gap: '12px' }}
                        >
                            <div style={{ display: 'flex' }}>
                                {[...Array(4)].map((_, i) => (
                                    <div
                                        key={i}
                                        style={{
                                            width: '32px',
                                            height: '32px',
                                            borderRadius: '50%',
                                            border: '2px solid var(--bg)',
                                            marginLeft: i > 0 ? '-8px' : 0,
                                            background: `hsl(${100 + i * 30}, 30%, ${35 + i * 5}%)`,
                                        }}
                                    />
                                ))}
                            </div>
                            <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                                <strong style={{ color: 'var(--text)' }}>50,000+</strong> atletas ya confían en nosotros
                            </span>
                        </div>
                    </div>

                    {/* RIGHT — Hero image panel */}
                    <div className="animate-fade-in" style={{ position: 'relative' }}>
                        {/* Glow behind image */}
                        <div style={{
                            position: 'absolute',
                            inset: '-20px',
                            background: 'radial-gradient(ellipse at center, rgba(198,241,53,0.12) 0%, transparent 70%)',
                            borderRadius: '40px',
                            zIndex: 0,
                        }} />

                        {/* Main image container */}
                        <div
                            className="clip-slash-tr"
                            style={{
                                position: 'relative',
                                zIndex: 1,
                                borderRadius: '28px',
                                overflow: 'hidden',
                                aspectRatio: '4 / 5',
                                border: '1px solid var(--border)',
                            }}
                        >
                            <img
                                src={heroImage}
                                alt="Fitness training"
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    objectPosition: 'center top',
                                }}
                            />
                            {/* Gradient overlay at bottom */}
                            <div style={{
                                position: 'absolute',
                                bottom: 0,
                                left: 0,
                                right: 0,
                                height: '50%',
                                background: 'linear-gradient(to top, rgba(8,11,8,0.85), transparent)',
                            }} />

                            {/* Floating stat badges */}
                            <div
                                className="animate-float glass"
                                style={{
                                    position: 'absolute',
                                    bottom: '32px',
                                    left: '20px',
                                    borderRadius: '14px',
                                    padding: '14px 18px',
                                }}
                            >
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.7rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '4px' }}>Sesión Actual</p>
                                <p style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '1.3rem', color: 'var(--text)' }}>Full Body HIIT</p>
                            </div>

                            <div
                                className="animate-float"
                                style={{
                                    position: 'absolute',
                                    bottom: '32px',
                                    right: '20px',
                                    background: 'var(--accent)',
                                    borderRadius: '14px',
                                    padding: '14px 18px',
                                    animationDelay: '1s',
                                }}
                            >
                                <p style={{ color: 'rgba(0,0,0,0.6)', fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '2px' }}>Calorías</p>
                                <p style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '1.6rem', color: '#0a0a0a', lineHeight: 1 }}>450</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;