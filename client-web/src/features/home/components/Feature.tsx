import { BiBarChart } from "react-icons/bi";
import { LuActivity, LuUtensils } from "react-icons/lu";

const features = [
    {
        icon: LuUtensils,
        num: "01",
        title: "Registro de Comidas IA",
        description: "Toma una foto, analiza automáticamente. Cataloga tu nutrición al instante con reconocimiento visual inteligente y sigue tu plan personalizado.",
    },
    {
        icon: LuActivity,
        num: "02",
        title: "Rastreo de Actividad",
        description: "Registra entrenamientos en segundos. Desde HIIT hasta Yoga — más de 500 ejercicios con presets de registro rápido y análisis de rendimiento.",
    },
    {
        icon: BiBarChart,
        num: "03",
        title: "Insights de Progreso",
        description: "Visualiza tu trayectoria con gráficos detallados, tendencias de salud y métricas que te mantienen motivado en cada hito.",
    },
];

const Feature = () => {
    return (
        <section id="features" style={{ padding: '7rem 1.5rem' }}>
            <div style={{ maxWidth: '1280px', margin: '0 auto' }}>

                {/* Section header */}
                <div style={{ marginBottom: '4rem' }}>
                    <p style={{
                        fontFamily: 'Syne, sans-serif',
                        fontWeight: 700,
                        fontSize: '0.72rem',
                        letterSpacing: '0.2em',
                        textTransform: 'uppercase',
                        color: 'var(--accent)',
                        marginBottom: '1rem',
                    }}>
                        Nuestras Herramientas
                    </p>
                    <h2 style={{
                        fontFamily: 'Syne, sans-serif',
                        fontWeight: 800,
                        fontSize: 'clamp(2.4rem, 4vw, 3.5rem)',
                        lineHeight: 1.1,
                        letterSpacing: '-0.02em',
                        color: 'var(--text)',
                        maxWidth: '560px',
                    }}>
                        Todo lo que necesitas para{' '}
                        <span style={{ color: 'var(--accent)' }}>transformar</span>
                    </h2>
                </div>

                {/* Feature cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((feature, index) => {
                        const Icon = feature.icon;
                        return (
                            <div
                                key={index}
                                className="clip-slash-tr"
                                style={{
                                    background: 'var(--bg-card)',
                                    border: '1px solid var(--border)',
                                    borderRadius: '20px',
                                    padding: '2.5rem 2rem',
                                    position: 'relative',
                                    overflow: 'hidden',
                                    cursor: 'default',
                                    transition: 'border-color 0.3s, transform 0.3s',
                                }}
                                onMouseEnter={e => {
                                    const el = e.currentTarget as HTMLElement;
                                    el.style.borderColor = 'rgba(198,241,53,0.3)';
                                    el.style.transform = 'translateY(-4px)';
                                }}
                                onMouseLeave={e => {
                                    const el = e.currentTarget as HTMLElement;
                                    el.style.borderColor = 'var(--border)';
                                    el.style.transform = 'translateY(0)';
                                }}
                            >
                                {/* Number */}
                                <span style={{
                                    fontFamily: 'Syne, sans-serif',
                                    fontWeight: 800,
                                    fontSize: '4rem',
                                    color: 'rgba(198,241,53,0.06)',
                                    position: 'absolute',
                                    top: '1rem',
                                    right: '1.5rem',
                                    lineHeight: 1,
                                    userSelect: 'none',
                                }}>
                                    {feature.num}
                                </span>

                                {/* Icon */}
                                <div style={{
                                    width: '52px',
                                    height: '52px',
                                    background: 'rgba(198,241,53,0.1)',
                                    border: '1px solid rgba(198,241,53,0.2)',
                                    borderRadius: '12px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginBottom: '1.5rem',
                                }}>
                                    <Icon style={{ width: '24px', height: '24px', color: 'var(--accent)' }} />
                                </div>

                                {/* Text */}
                                <h3 style={{
                                    fontFamily: 'Syne, sans-serif',
                                    fontWeight: 700,
                                    fontSize: '1.2rem',
                                    color: 'var(--text)',
                                    marginBottom: '0.75rem',
                                    letterSpacing: '-0.01em',
                                }}>
                                    {feature.title}
                                </h3>
                                <p style={{
                                    color: 'var(--text-muted)',
                                    fontSize: '0.9rem',
                                    lineHeight: 1.7,
                                }}>
                                    {feature.description}
                                </p>

                                {/* Hover scan-line effect */}
                                <div style={{
                                    position: 'absolute',
                                    bottom: 0,
                                    left: 0,
                                    right: 0,
                                    height: '2px',
                                    background: 'linear-gradient(90deg, transparent, var(--accent), transparent)',
                                    opacity: 0,
                                    transition: 'opacity 0.3s',
                                }}
                                    className="card-bottom-line"
                                />
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Feature;