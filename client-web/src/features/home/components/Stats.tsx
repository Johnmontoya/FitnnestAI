import { BiTrendingUp, BiUser } from "react-icons/bi";
import { LuScale } from "react-icons/lu";

const stats = [
    {
        icon: BiUser,
        label: "Usuarios Activos",
        value: "50K+",
        change: "+62% este mes",
        desc: "atletas registrados en la plataforma",
    },
    {
        icon: BiTrendingUp,
        label: "Registros Totales",
        value: "1.2M+",
        change: "+35% este mes",
        desc: "actividades y comidas tracked",
    },
    {
        icon: LuScale,
        label: "Peso Perdido",
        value: "250K lbs",
        change: "+5% este mes",
        desc: "por nuestra comunidad combinada",
    },
];

const Stats = () => {
    return (
        <section id="stats" style={{ padding: '6rem 1.5rem' }}>
            <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
                {/* Label */}
                <p style={{
                    fontFamily: 'Syne, sans-serif',
                    fontWeight: 700,
                    fontSize: '0.72rem',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: 'var(--accent)',
                    marginBottom: '1rem',
                    textAlign: 'center',
                }}>
                    Impacto Real
                </p>

                {/* Stats grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3" style={{ position: 'relative' }}>
                    {stats.map((stat, index) => {
                        const Icon = stat.icon;
                        return (
                            <div
                                key={index}
                                style={{
                                    padding: '3rem 2.5rem',
                                    borderRight: index < 2 ? '1px solid var(--border)' : 'none',
                                    borderTop: '1px solid var(--border)',
                                    position: 'relative',
                                    overflow: 'hidden',
                                }}
                            >
                                {/* Top accent line that draws in */}
                                <div style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '48px',
                                    height: '3px',
                                    background: 'var(--accent)',
                                    transformOrigin: 'left center',
                                    animation: `draw-line 0.6s cubic-bezier(0.22,1,0.36,1) ${0.2 + index * 0.15}s both`,
                                }} />

                                {/* Icon */}
                                <div style={{
                                    width: '40px',
                                    height: '40px',
                                    background: 'rgba(198,241,53,0.1)',
                                    borderRadius: '10px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginBottom: '1.5rem',
                                }}>
                                    <Icon style={{ width: '20px', height: '20px', color: 'var(--accent)' }} />
                                </div>

                                {/* Value */}
                                <p style={{
                                    fontFamily: 'Syne, sans-serif',
                                    fontWeight: 800,
                                    fontSize: 'clamp(2.8rem, 4vw, 4rem)',
                                    lineHeight: 1,
                                    color: 'var(--text)',
                                    letterSpacing: '-0.03em',
                                    marginBottom: '0.5rem',
                                }}>
                                    {stat.value}
                                </p>

                                {/* Label */}
                                <p style={{
                                    fontFamily: 'Syne, sans-serif',
                                    fontWeight: 700,
                                    fontSize: '0.8rem',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.1em',
                                    color: 'var(--text-muted)',
                                    marginBottom: '0.4rem',
                                }}>
                                    {stat.label}
                                </p>

                                {/* Change */}
                                <p style={{
                                    fontSize: '0.82rem',
                                    color: 'var(--accent)',
                                    fontWeight: 600,
                                    marginBottom: '0.25rem',
                                }}>
                                    ↑ {stat.change}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Stats;