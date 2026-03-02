import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LuActivity } from 'react-icons/lu';
import { useAuthStore } from '../../store/useAuthStore';
import FormRegister from '../../components/FormRegister';

export const RegisterPage = () => {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuthStore();

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/dashboard', { replace: true });
        }
    }, [isAuthenticated, navigate]);

    return (
        <div style={{
            minHeight: '100vh',
            background: 'var(--bg)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem 1rem',
            position: 'relative',
        }}
            className="aurora-bg"
        >
            <div style={{ width: '100%', maxWidth: '520px', position: 'relative', zIndex: 1 }}>
                {/* Logo */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '2rem' }}>
                    <div style={{
                        width: '36px', height: '36px',
                        background: 'var(--accent)',
                        borderRadius: '9px',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
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

                {/* Card container */}
                <div style={{
                    background: 'var(--bg-surface)',
                    borderRadius: '20px',
                    border: '1px solid var(--border)',
                    padding: '2.5rem',
                    boxShadow: '0 24px 48px rgba(0,0,0,0.4)',
                    position: 'relative',
                    overflow: 'hidden',
                }}>
                    {/* Top accent line */}
                    <div style={{
                        position: 'absolute',
                        top: 0, left: 0, right: 0,
                        height: '2px',
                        background: 'linear-gradient(90deg, transparent, var(--accent), transparent)',
                    }} />

                    <FormRegister />
                </div>

                {/* Login link */}
                <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>
                        ¿Ya tienes cuenta?{' '}
                        <button
                            onClick={() => navigate('/login')}
                            style={{
                                background: 'none', border: 'none',
                                color: 'var(--accent)', fontWeight: 600,
                                cursor: 'pointer', fontSize: '0.88rem',
                                fontFamily: 'DM Sans, sans-serif',
                            }}
                        >
                            Inicia sesión
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;