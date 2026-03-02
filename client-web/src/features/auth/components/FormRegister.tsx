import { LuEye, LuEyeOff, LuMail } from "react-icons/lu";
import { BiLock, BiUser } from "react-icons/bi";
import { useForm, type SubmitHandler } from "react-hook-form";
import { accountSchema, type SignupFormData } from "../types/auth.types";
import { useAuthRegisterMutation } from "../hooks/mutation/useAuthMutation";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";

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

const FormRegister: React.FC = () => {
    const navigate = useNavigate();
    const authRegisterMutation = useAuthRegisterMutation();
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
    const [serverError, setServerError] = useState<string | null>(null);
    const [focusedField, setFocusedField] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<SignupFormData>({
        resolver: zodResolver(accountSchema),
        defaultValues: { username: '', email: '', password: '', confirmPassword: '' },
        mode: 'onChange',
    });

    const onSubmit: SubmitHandler<SignupFormData> = async (data) => {
        setServerError(null);
        try {
            const { confirmPassword, ...rest } = data;
            authRegisterMutation.mutateAsync(rest);
            reset();
            navigate('/login');
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || error.message || 'Error al crear la cuenta';
            setServerError(errorMessage);
        }
    };

    const getFocusStyle = (field: string): React.CSSProperties => focusedField === field
        ? {
            borderColor: 'var(--accent)',
            boxShadow: '0 0 0 3px var(--accent-glow), inset 0 0 12px rgba(198,241,53,0.03)',
        }
        : {};

    const fields = [
        {
            key: 'username',
            label: 'Nombre de usuario',
            type: 'text',
            placeholder: 'john_doe',
            Icon: BiUser,
            regKey: 'username' as const,
            error: errors.username,
        },
        {
            key: 'email',
            label: 'Correo electrónico',
            type: 'email',
            placeholder: 'john@ejemplo.com',
            Icon: LuMail,
            regKey: 'email' as const,
            error: errors.email,
        },
    ];

    return (
        <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
            <div style={{ marginBottom: '0.5rem' }}>
                <h2 style={{
                    fontFamily: 'Syne, sans-serif',
                    fontWeight: 800,
                    fontSize: '1.6rem',
                    color: 'var(--text)',
                    letterSpacing: '-0.02em',
                    marginBottom: '0.4rem',
                }}>
                    Crea tu cuenta
                </h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                    Comienza tu viaje de transformación hoy
                </p>
            </div>

            {/* Text/email fields */}
            {fields.map(({ key, label, type, placeholder, Icon, regKey, error }) => (
                <div key={key}>
                    <label style={labelStyle}>{label}</label>
                    <div style={{ position: 'relative' }}>
                        <Icon style={{
                            position: 'absolute', left: '0.9rem', top: '50%', transform: 'translateY(-50%)',
                            width: '17px', height: '17px',
                            color: focusedField === key ? 'var(--accent)' : 'var(--text-subtle)',
                            transition: 'color 0.2s',
                        }} />
                        <input
                            type={type}
                            {...register(regKey)}
                            placeholder={placeholder}
                            style={{
                                ...inputBase,
                                ...getFocusStyle(key),
                                borderColor: error ? '#ef4444' : undefined,
                            }}
                            onFocus={() => setFocusedField(key)}
                            onBlur={() => setFocusedField(null)}
                        />
                    </div>
                    {error && <p style={{ color: '#f87171', fontSize: '0.8rem', marginTop: '0.35rem' }}>{error.message}</p>}
                </div>
            ))}

            {/* Password */}
            {[
                { key: 'password', label: 'Contraseña', regKey: 'password' as const, show: showPassword, toggle: () => setShowPassword(!showPassword), error: errors.password },
                { key: 'confirmPassword', label: 'Confirmar contraseña', regKey: 'confirmPassword' as const, show: showConfirmPassword, toggle: () => setShowConfirmPassword(!showConfirmPassword), error: errors.confirmPassword },
            ].map(({ key, label, regKey, show, toggle, error }) => (
                <div key={key}>
                    <label style={labelStyle}>{label}</label>
                    <div style={{ position: 'relative' }}>
                        <BiLock style={{
                            position: 'absolute', left: '0.9rem', top: '50%', transform: 'translateY(-50%)',
                            width: '17px', height: '17px',
                            color: focusedField === key ? 'var(--accent)' : 'var(--text-subtle)',
                            transition: 'color 0.2s',
                        }} />
                        <input
                            type={show ? 'text' : 'password'}
                            {...register(regKey)}
                            placeholder="••••••••"
                            style={{
                                ...inputBase,
                                paddingRight: '3rem',
                                ...getFocusStyle(key),
                                borderColor: error ? '#ef4444' : undefined,
                            }}
                            onFocus={() => setFocusedField(key)}
                            onBlur={() => setFocusedField(null)}
                        />
                        <button
                            type="button"
                            onClick={toggle}
                            style={{
                                position: 'absolute', right: '0.9rem', top: '50%', transform: 'translateY(-50%)',
                                background: 'none', border: 'none', cursor: 'pointer',
                                color: 'var(--text-subtle)', transition: 'color 0.2s', padding: 0,
                            }}
                            onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent)')}
                            onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-subtle)')}
                        >
                            {show ? <LuEyeOff style={{ width: '17px', height: '17px' }} /> : <LuEye style={{ width: '17px', height: '17px' }} />}
                        </button>
                    </div>
                    {error && <p style={{ color: '#f87171', fontSize: '0.8rem', marginTop: '0.35rem' }}>{error.message}</p>}
                </div>
            ))}

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
                disabled={isSubmitting || authRegisterMutation.isPending}
                style={{ width: '100%', padding: '0.95rem', fontSize: '0.95rem', marginTop: '0.25rem' }}
            >
                {isSubmitting || authRegisterMutation.isPending ? (
                    <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                        <span style={{
                            width: '16px', height: '16px',
                            border: '2px solid rgba(0,0,0,0.3)',
                            borderTopColor: '#0a0a0a',
                            borderRadius: '50%',
                            display: 'inline-block',
                            animation: 'spin 0.8s linear infinite',
                        }} />
                        Creando cuenta...
                    </span>
                ) : (
                    <span>Finalizar registro <span style={{ marginLeft: '6px' }}>✓</span></span>
                )}
            </button>
        </form>
    );
};

export default FormRegister;