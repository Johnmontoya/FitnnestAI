import { BiLock } from "react-icons/bi"
import { LuEye, LuEyeOff, LuMail } from "react-icons/lu"
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { loginSchema, type LoginRequest } from "../types/auth.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";

interface FormLoginProps {
    login: (data: LoginRequest) => Promise<void>;
}

const inputBase: React.CSSProperties = {
    width: '100%',
    background: 'var(--bg-surface)',
    color: 'var(--text)',
    borderRadius: '10px',
    padding: '0.85rem 1rem 0.85rem 2.85rem',
    border: '1px solid rgba(198,241,53,0.12)',
    fontSize: '0.95rem',
    fontFamily: 'DM Sans, sans-serif',
    outline: 'none',
    transition: 'border-color 0.2s, box-shadow 0.2s',
};

const labelStyle: React.CSSProperties = {
    display: 'block',
    color: 'var(--text-muted)',
    fontSize: '0.8rem',
    fontWeight: 600,
    letterSpacing: '0.05em',
    textTransform: 'uppercase',
    marginBottom: '0.5rem',
    fontFamily: 'Syne, sans-serif',
};

const FormLogin: React.FC<FormLoginProps> = ({ login }) => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [rememberMe, setRememberMe] = useState<boolean>(false);
    const [serverError, setServerError] = useState<string | null>(null);
    const [focusedField, setFocusedField] = useState<string | null>(null);

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<LoginRequest>({
        resolver: zodResolver(loginSchema),
        defaultValues: { email: '', password: '' },
        mode: 'onChange',
    });

    const onSubmit: SubmitHandler<LoginRequest> = async (data) => {
        setServerError(null);
        setIsLoading(true);
        try {
            await login(data);
            reset();
            navigate('/dashboard');
        } catch (error: unknown) {
            const errorMessage = (error as { response?: { data?: { message?: string } } }).response?.data?.message || (error as Error).message || 'Error al iniciar sesión';
            setServerError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    const getFocusStyle = (field: string): React.CSSProperties => focusedField === field
        ? {
            borderColor: 'var(--accent)',
            boxShadow: '0 0 0 3px var(--accent-glow), inset 0 0 12px rgba(198,241,53,0.03)',
        }
        : {};

    return (
        <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

            {/* Email */}
            <div>
                <label style={labelStyle}>Correo electrónico</label>
                <div style={{ position: 'relative' }}>
                    <LuMail style={{
                        position: 'absolute', left: '0.9rem', top: '50%', transform: 'translateY(-50%)',
                        width: '17px', height: '17px', color: focusedField === 'email' ? 'var(--accent)' : 'var(--text-subtle)',
                        transition: 'color 0.2s',
                    }} />
                    <input
                        type="email"
                        {...register('email')}
                        placeholder="nombre@ejemplo.com"
                        style={{
                            ...inputBase,
                            ...getFocusStyle('email'),
                            borderColor: errors.email ? '#ef4444' : undefined,
                        }}
                        onFocus={() => setFocusedField('email')}
                        onBlur={() => setFocusedField(null)}
                    />
                </div>
                {errors.email && (
                    <p style={{ color: '#f87171', fontSize: '0.8rem', marginTop: '0.4rem' }}>{errors.email.message}</p>
                )}
            </div>

            {/* Password */}
            <div>
                <label style={labelStyle}>Contraseña</label>
                <div style={{ position: 'relative' }}>
                    <BiLock style={{
                        position: 'absolute', left: '0.9rem', top: '50%', transform: 'translateY(-50%)',
                        width: '17px', height: '17px', color: focusedField === 'password' ? 'var(--accent)' : 'var(--text-subtle)',
                        transition: 'color 0.2s',
                    }} />
                    <input
                        type={showPassword ? 'text' : 'password'}
                        {...register('password')}
                        placeholder="••••••••"
                        style={{
                            ...inputBase,
                            paddingRight: '3rem',
                            ...getFocusStyle('password'),
                            borderColor: errors.password ? '#ef4444' : undefined,
                        }}
                        onFocus={() => setFocusedField('password')}
                        onBlur={() => setFocusedField(null)}
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        style={{
                            position: 'absolute', right: '0.9rem', top: '50%', transform: 'translateY(-50%)',
                            background: 'none', border: 'none', cursor: 'pointer',
                            color: 'var(--text-subtle)', transition: 'color 0.2s', padding: 0,
                        }}
                        onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent)')}
                        onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-subtle)')}
                    >
                        {showPassword ? <LuEyeOff style={{ width: '17px', height: '17px' }} /> : <LuEye style={{ width: '17px', height: '17px' }} />}
                    </button>
                </div>
                {errors.password && (
                    <p style={{ color: '#f87171', fontSize: '0.8rem', marginTop: '0.4rem' }}>{errors.password.message}</p>
                )}
            </div>

            {/* Remember & Forgot */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                    <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={e => setRememberMe(e.target.checked)}
                        style={{ accentColor: 'var(--accent)', width: '16px', height: '16px', cursor: 'pointer' }}
                    />
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Recordarme</span>
                </label>
                <button
                    type="button"
                    onClick={() => navigate('/forgot-password')}
                    style={{
                        background: 'none', border: 'none', color: 'var(--accent)',
                        fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer',
                        fontFamily: 'DM Sans, sans-serif',
                    }}
                >
                    ¿Olvidaste tu contraseña?
                </button>
            </div>

            {/* Server error */}
            {serverError && (
                <div style={{
                    background: 'rgba(239,68,68,0.08)',
                    border: '1px solid rgba(239,68,68,0.3)',
                    borderRadius: '10px', padding: '0.75rem 1rem',
                }}>
                    <p style={{ color: '#f87171', fontSize: '0.85rem' }}>{serverError}</p>
                </div>
            )}

            {/* Submit */}
            <button
                type="submit"
                className="btn-primary"
                disabled={isLoading}
                style={{ width: '100%', padding: '0.95rem', fontSize: '0.95rem', marginTop: '0.25rem' }}
            >
                {isLoading ? (
                    <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                        <span style={{
                            width: '16px', height: '16px',
                            border: '2px solid rgba(0,0,0,0.3)',
                            borderTopColor: '#0a0a0a',
                            borderRadius: '50%',
                            display: 'inline-block',
                            animation: 'spin 0.8s linear infinite',
                        }} />
                        Iniciando sesión...
                    </span>
                ) : 'Iniciar sesión'}
            </button>

            {/* Divider */}
            <div style={{ position: 'relative', margin: '0.5rem 0' }}>
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center' }}>
                    <div style={{ width: '100%', borderTop: '1px solid var(--border)' }} />
                </div>
                <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
                    <span style={{
                        padding: '0 1rem',
                        background: 'var(--bg-surface)',
                        color: 'var(--text-subtle)',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        fontFamily: 'Syne, sans-serif',
                    }}>
                        O continúa con
                    </span>
                </div>
            </div>

            {/* Social buttons */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                {[
                    {
                        label: 'Google',
                        svg: (
                            <svg style={{ width: '18px', height: '18px' }} viewBox="0 0 24 24">
                                <path fill="#EA4335" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                <path fill="#4285F4" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                <path fill="#34A853" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                            </svg>
                        ),
                    },
                    {
                        label: 'Apple',
                        svg: (
                            <svg style={{ width: '18px', height: '18px' }} viewBox="0 0 24 24" fill="currentColor">
                                <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                            </svg>
                        ),
                    },
                ].map(({ label, svg }) => (
                    <button
                        key={label}
                        type="button"
                        style={{
                            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                            padding: '0.75rem',
                            background: 'var(--bg-elevated)',
                            border: '1px solid var(--border)',
                            borderRadius: '10px',
                            color: 'var(--text)',
                            fontFamily: 'DM Sans, sans-serif',
                            fontWeight: 500,
                            fontSize: '0.9rem',
                            cursor: 'pointer',
                            transition: 'border-color 0.2s, background 0.2s',
                        }}
                        onMouseEnter={e => {
                            const el = e.currentTarget as HTMLElement;
                            el.style.borderColor = 'rgba(198,241,53,0.3)';
                            el.style.background = 'rgba(198,241,53,0.04)';
                        }}
                        onMouseLeave={e => {
                            const el = e.currentTarget as HTMLElement;
                            el.style.borderColor = 'var(--border)';
                            el.style.background = 'var(--bg-elevated)';
                        }}
                    >
                        {svg}
                        {label}
                    </button>
                ))}
            </div>
        </form>
    );
};

export default FormLogin;