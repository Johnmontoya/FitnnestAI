import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';
import { LuActivity } from 'react-icons/lu';
import FormLogin from '../../components/FormLogin';

const LoginPage: React.FC = () => {
    const navigate = useNavigate();
    const { login, isAuthenticated } = useAuthStore();

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/dashboard', { replace: true });
        }
    }, [isAuthenticated, navigate]);

    return (
        <div className='flex flex-row' style={{
            width: '100%',
            minHeight: '100vh',
            background: 'var(--bg)',
        }}>
            {/* Left Side — Hero Image */}
            <div style={{
                flex: 1,
                position: 'relative',
                overflow: 'hidden',
            }}
                className="w-full hidden lg:flex"
            >
                {/* Image */}
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: `url('https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=900&q=80')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }} />
                {/* Dark overlay */}
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(8,11,8,0.85) 0%, rgba(8,11,8,0.4) 50%, rgba(8,11,8,0.2) 100%)',
                }} />
                {/* Acid-lime vertical accent line */}
                <div style={{
                    position: 'absolute',
                    right: 0,
                    top: '10%',
                    bottom: '10%',
                    width: '2px',
                    background: 'linear-gradient(to bottom, transparent, var(--accent), transparent)',
                }} />

                {/* Content */}
                <div style={{
                    position: 'relative',
                    zIndex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    padding: '3rem',
                }}>
                    <div style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        background: 'rgba(198,241,53,0.1)',
                        border: '1px solid rgba(198,241,53,0.25)',
                        borderRadius: '100px',
                        padding: '6px 14px',
                        marginBottom: '1.5rem',
                        width: 'fit-content',
                    }}>
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
                            fontSize: '0.7rem',
                            letterSpacing: '0.1em',
                            textTransform: 'uppercase',
                            color: 'var(--accent)',
                        }}>
                            Performance Tracker
                        </span>
                    </div>
                    <h1 className='p-3!' style={{
                        fontFamily: 'Syne, sans-serif',
                        fontWeight: 800,
                        fontSize: 'clamp(2.5rem, 4vw, 4rem)',
                        lineHeight: 1.05,
                        letterSpacing: '-0.03em',
                        color: 'var(--text)',
                        marginBottom: '1rem',
                    }}>
                        Eleva Tu<br />
                        <span style={{ color: 'var(--accent)' }}>Rendimiento</span><br />
                        Diario.
                    </h1>
                    <p className='p-2!' style={{
                        color: 'var(--text-muted)',
                        fontSize: '1rem',
                        lineHeight: 1.65,
                        maxWidth: '360px',
                    }}>
                        Registra cada paso, caloría y hito con nuestro ecosistema de fitness de nivel profesional.
                    </p>
                </div>
            </div>

            {/* Right Side — Login Form */}
            <div className='w-full lg:w-1/2' style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '2.5rem 2rem',
                borderLeft: '1px solid var(--border)',
                background: 'var(--bg-surface)',
            }}>
                <div style={{ width: '100%', maxWidth: '400px' }}>
                    {/* Logo */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '2.5rem' }}>
                        <div style={{
                            width: '36px', height: '36px',
                            background: 'var(--accent)',
                            borderRadius: '9px',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            flexShrink: 0,
                        }}>
                            <LuActivity style={{ width: '20px', height: '20px', color: '#0a0a0a', strokeWidth: 2.5 }} />
                        </div>
                        <Link to="/" style={{ textDecoration: 'none' }}>
                            <span style={{
                                fontFamily: 'Syne, sans-serif',
                                fontWeight: 800,
                                fontSize: '1.1rem',
                                letterSpacing: '0.06em',
                                textTransform: 'uppercase',
                                color: 'var(--text)',
                            }}>
                                Fitnest<span style={{ color: 'var(--accent)' }}>AI</span>
                            </span>
                        </Link>
                    </div>

                    {/* Header */}
                    <div style={{ marginBottom: '2rem' }}>
                        <h2 style={{
                            fontFamily: 'Syne, sans-serif',
                            fontWeight: 800,
                            fontSize: '1.8rem',
                            color: 'var(--text)',
                            letterSpacing: '-0.02em',
                            marginBottom: '0.4rem',
                        }}>
                            Bienvenido de nuevo
                        </h2>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                            ¿Listo para tu próximo entrenamiento? Ingresa tus datos para seguir tu progreso.
                        </p>
                    </div>

                    {/* Form */}
                    <FormLogin login={login} />

                    {/* Sign up link */}
                    <div style={{ marginTop: '2rem', textAlign: 'center' }}>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>
                            ¿No tienes cuenta?{' '}
                            <button
                                onClick={() => navigate('/register')}
                                style={{
                                    background: 'none', border: 'none',
                                    color: 'var(--accent)', fontWeight: 600,
                                    cursor: 'pointer', fontSize: '0.88rem',
                                    fontFamily: 'DM Sans, sans-serif',
                                }}
                            >
                                Regístrate ahora
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;