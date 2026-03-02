import { BiStar } from "react-icons/bi";
import testimonialImage from "../../../assets/testimonio1.png";

const Testimonial = () => {
    return (
        <section id="testimonials" style={{ padding: '7rem 1.5rem' }}>
            <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '5rem',
                    alignItems: 'center',
                }}>

                    {/* LEFT — Image Panel */}
                    <div style={{ position: 'relative' }}>
                        {/* Glow */}
                        <div style={{
                            position: 'absolute',
                            inset: '-30px',
                            background: 'radial-gradient(ellipse at 30% 50%, rgba(198,241,53,0.1) 0%, transparent 70%)',
                            zIndex: 0,
                        }} />

                        {/* Image with diagonal clip */}
                        <div
                            className="clip-slash-br"
                            style={{
                                position: 'relative',
                                zIndex: 1,
                                borderRadius: '24px',
                                overflow: 'hidden',
                                aspectRatio: '3 / 4',
                                border: '1px solid var(--border)',
                            }}
                        >
                            <img
                                src={testimonialImage}
                                alt="Success story"
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                            {/* Overlay */}
                            <div style={{
                                position: 'absolute',
                                inset: 0,
                                background: 'linear-gradient(to top, rgba(8,11,8,0.6) 0%, transparent 50%)',
                            }} />

                            {/* Badge inside image */}
                            <div
                                className="animate-float"
                                style={{
                                    position: 'absolute',
                                    bottom: '24px',
                                    left: '24px',
                                    background: 'var(--accent)',
                                    borderRadius: '14px',
                                    padding: '12px 20px',
                                }}
                            >
                                <p style={{ color: 'rgba(0,0,0,0.6)', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Resultado</p>
                                <p style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '2rem', color: '#0a0a0a', lineHeight: 1 }}>-35lb</p>
                            </div>

                            {/* Label */}
                            <div style={{
                                position: 'absolute',
                                top: '20px',
                                left: '20px',
                                background: 'rgba(8,11,8,0.75)',
                                backdropFilter: 'blur(10px)',
                                borderRadius: '8px',
                                padding: '6px 12px',
                                border: '1px solid var(--border)',
                            }}>
                                <p style={{
                                    fontFamily: 'Syne, sans-serif',
                                    fontWeight: 700,
                                    fontSize: '0.65rem',
                                    letterSpacing: '0.15em',
                                    textTransform: 'uppercase',
                                    color: 'var(--accent)',
                                }}>
                                    Historia de Éxito
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT — Quote */}
                    <div>
                        {/* Stars */}
                        <div style={{ display: 'flex', gap: '4px', marginBottom: '1.5rem' }}>
                            {[...Array(5)].map((_, i) => (
                                <BiStar
                                    key={i}
                                    style={{ width: '20px', height: '20px', color: 'var(--accent)', fill: 'var(--accent)' }}
                                />
                            ))}
                        </div>

                        {/* Giant quotation mark */}
                        <div style={{
                            fontFamily: 'Syne, sans-serif',
                            fontWeight: 800,
                            fontSize: '6rem',
                            color: 'var(--accent)',
                            lineHeight: 0.7,
                            marginBottom: '1rem',
                            opacity: 0.6,
                        }}>
                            "
                        </div>

                        {/* Quote */}
                        <blockquote style={{
                            fontFamily: 'DM Sans, sans-serif',
                            fontWeight: 400,
                            fontStyle: 'italic',
                            fontSize: 'clamp(1.1rem, 2vw, 1.4rem)',
                            lineHeight: 1.65,
                            color: 'var(--text)',
                            marginBottom: '2rem',
                        }}>
                            Esta app cambió por completo mi forma de ver mis hábitos diarios. El registro de comidas es tan rápido que realmente lo sigo por primera vez en años. Perdí 35 libras en 4 meses.
                        </blockquote>

                        <span className="accent-line" style={{ marginBottom: '1.5rem' }} />

                        {/* Author */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '1.5rem' }}>
                            <div style={{
                                width: '48px',
                                height: '48px',
                                borderRadius: '50%',
                                background: 'linear-gradient(135deg, #4a6a3a, #2a4a2a)',
                                border: '2px solid var(--accent)',
                                flexShrink: 0,
                            }} />
                            <div>
                                <p style={{
                                    fontFamily: 'Syne, sans-serif',
                                    fontWeight: 700,
                                    fontSize: '1rem',
                                    color: 'var(--text)',
                                    marginBottom: '2px',
                                }}>
                                    Sarah Jenkins
                                </p>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>
                                    Miembro desde Marzo 2024
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Testimonial;