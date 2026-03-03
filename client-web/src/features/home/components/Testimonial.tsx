import { BiStar } from "react-icons/bi";
import testimonialImage from "../../../assets/testimonio1.png";
import { LuActivity } from "react-icons/lu";

const Testimonial = () => {
    return (
        <section id="testimonials" style={{ padding: '7rem 1.5rem' }}>
            <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">

                    {/* LEFT — Image Panel */}
                    <div style={{ position: 'relative' }} className="order-2 md:order-1">
                        {/* Glow */}
                        <div style={{
                            position: 'absolute',
                            inset: '-30px',
                            background: 'radial-gradient(ellipse at 30% 50%, rgba(198,241,53,0.1) 0%, transparent 70%)',
                            zIndex: 0,
                        }} />

                        {/* Image with diagonal clip */}
                        <div
                            className="clip-slash-br mx-auto md:mx-0"
                            style={{
                                position: 'relative',
                                zIndex: 1,
                                borderRadius: '24px',
                                overflow: 'hidden',
                                aspectRatio: '1 / 1',
                                maxWidth: '500px',
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
                                background: 'linear-gradient(to top, rgba(8,11,8,0.7) 0%, transparent 60%)',
                            }} />

                            {/* Badge inside image */}
                            <div
                                className="animate-float"
                                style={{
                                    position: 'absolute',
                                    bottom: '32px',
                                    left: '32px',
                                    background: 'var(--accent)',
                                    borderRadius: '16px',
                                    padding: '14px 24px',
                                    boxShadow: '0 8px 32px rgba(198, 241, 53, 0.3)',
                                }}
                            >
                                <p style={{ color: 'rgba(0,0,0,0.6)', fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '4px' }}>Resultado</p>
                                <p style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '2.4rem', color: '#0a0a0a', lineHeight: 0.9 }}>-35lb</p>
                            </div>

                            {/* Label */}
                            <div style={{
                                position: 'absolute',
                                top: '24px',
                                left: '24px',
                                background: 'rgba(8,11,8,0.85)',
                                backdropFilter: 'blur(12px)',
                                borderRadius: '10px',
                                padding: '8px 16px',
                                border: '1px solid var(--border-mid)',
                            }}>
                                <p style={{
                                    fontFamily: 'Syne, sans-serif',
                                    fontWeight: 700,
                                    fontSize: '0.7rem',
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
                    <div className="order-1 md:order-2 text-center md:text-left">
                        {/* Stars */}
                        <div style={{ display: 'flex', gap: '6px', marginBottom: '2rem', justifyContent: 'inherit' }} className="justify-center md:justify-start">
                            {[...Array(5)].map((_, i) => (
                                <BiStar
                                    key={i}
                                    style={{ width: '22px', height: '22px', color: 'var(--accent)', fill: 'var(--accent)' }}
                                />
                            ))}
                        </div>

                        {/* Giant quotation mark */}
                        <div style={{
                            fontFamily: 'Syne, sans-serif',
                            fontWeight: 800,
                            fontSize: 'clamp(4rem, 10vw, 7rem)',
                            color: 'var(--accent)',
                            lineHeight: 0.7,
                            marginBottom: '1.5rem',
                            opacity: 0.4,
                        }}>
                            "
                        </div>

                        {/* Quote */}
                        <blockquote style={{
                            fontFamily: 'DM Sans, sans-serif',
                            fontWeight: 400,
                            fontStyle: 'italic',
                            fontSize: 'clamp(1.2rem, 3vw, 1.6rem)',
                            lineHeight: 1.6,
                            color: 'var(--text)',
                            marginBottom: '2.5rem',
                            maxWidth: '540px',
                            marginLeft: 'auto',
                            marginRight: 'auto',
                        }} className="md:ml-0 md:mr-0">
                            "Esta aplicación transformó mi relación con el fitness. El seguimiento de comida es tan intuitivo que por fin pude ser constante. Perdí 35 libras y gané una disciplina que nunca pensé tener."
                        </blockquote>

                        <div className="flex md:block justify-center">
                            <span className="accent-line" style={{ marginBottom: '2rem' }} />
                        </div>

                        {/* Author */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', marginTop: '2rem' }} className="justify-center md:justify-start">
                            <div style={{
                                width: '56px',
                                height: '56px',
                                borderRadius: '50%',
                                background: 'linear-gradient(135deg, #1a2a1a, #0a1a0a)',
                                border: '2px solid var(--accent)',
                                flexShrink: 0,
                                overflow: 'hidden',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                                <LuActivity style={{ color: 'var(--accent)', opacity: 0.5, width: '20px', height: '20px' }} />
                            </div>
                            <div>
                                <p style={{
                                    fontFamily: 'Syne, sans-serif',
                                    fontWeight: 700,
                                    fontSize: '1.1rem',
                                    color: 'var(--text)',
                                    marginBottom: '4px',
                                }}>
                                    Sarah Jenkins
                                </p>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 500 }}>
                                    Miembro Pro desde 2024
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