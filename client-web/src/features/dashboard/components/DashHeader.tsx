import { Button } from "../../../shared/ui/Button"
import type { User } from "../../auth/types/auth.types"
import { LuZap } from "react-icons/lu"

interface DashHeaderProps {
    user: User;
    totalCalories: number;
    dailyCalories: number;
    totalCaloriesBurned: number;
}

const DashHeader = ({ user, totalCalories, dailyCalories, totalCaloriesBurned }: DashHeaderProps) => {
    const getMotivationalMessage = () => {
        const percentage = (totalCalories / dailyCalories) * 100;
        if (totalCalories === 0 && totalCaloriesBurned === 0) return { text: "¡Listo para la rutina? Empieza a registrar!", emoji: "💪" };
        if (percentage > 100) return { text: "Superaste el límite, ¡mañana es un nuevo día!", emoji: "🌅" };
        if (percentage >= 80) return { text: "Casi llegas a tu límite, ¡mantente alerta!", emoji: "⚡" };
        if (totalCaloriesBurned >= 30) return { text: "¡Excelente rutina hoy! ¡Sigue adelante!", emoji: "🔥" };
        if (percentage >= 50) return { text: "¡Excelente progreso, sigue adelante!", emoji: "✨" };
        return { text: "¡Cada paso cuenta. Tienes esto!", emoji: "🚀" };
    };

    const motivation = getMotivationalMessage();
    const pct = Math.round((totalCalories / dailyCalories) * 100) || 0;
    console.log(totalCalories, dailyCalories);

    return (
        <div style={{ marginBottom: '2rem' }}>
            {/* Title row */}
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                <div>
                    <p style={{
                        fontFamily: 'Syne, sans-serif',
                        fontWeight: 700,
                        fontSize: '0.72rem',
                        letterSpacing: '0.15em',
                        textTransform: 'uppercase',
                        color: 'var(--accent)',
                        marginBottom: '0.4rem',
                    }}>
                        Dashboard
                    </p>
                    <h1 style={{
                        fontFamily: 'Syne, sans-serif',
                        fontWeight: 800,
                        fontSize: 'clamp(1.8rem, 3vw, 2.4rem)',
                        color: 'var(--text)',
                        letterSpacing: '-0.02em',
                        marginBottom: '0.25rem',
                    }}>
                        Hola, {user.name} 👋
                    </h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                        Listo para tu siguiente rutina? Registra tu progreso.
                    </p>
                </div>
                <Button variant="outline" size="sm">
                    Ver Estadísticas
                </Button>
            </div>

            {/* Motivational Banner */}
            <div style={{
                background: 'var(--bg-card)',
                border: '1px solid rgba(198,241,53,0.2)',
                borderRadius: '16px',
                padding: '1.25rem 1.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '1rem',
                position: 'relative',
                overflow: 'hidden',
            }}>
                {/* Subtle glow */}
                <div style={{
                    position: 'absolute',
                    left: 0, top: 0, bottom: 0,
                    width: '4px',
                    background: 'var(--accent)',
                    borderRadius: '16px 0 0 16px',
                }} />

                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', paddingLeft: '0.5rem' }}>
                    <span style={{ fontSize: '1.8rem' }}>{motivation.emoji}</span>
                    <div>
                        <h3 style={{
                            fontFamily: 'Syne, sans-serif',
                            fontWeight: 700,
                            fontSize: '0.95rem',
                            color: 'var(--text)',
                            marginBottom: '2px',
                        }}>
                            {motivation.text}
                        </h3>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>
                            Estás al <span style={{ color: 'var(--accent)', fontWeight: 700 }}>{pct}%</span> de tu objetivo diario de {dailyCalories.toLocaleString()} kcal
                        </p>
                    </div>
                </div>

                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    background: 'rgba(198,241,53,0.08)',
                    border: '1px solid rgba(198,241,53,0.2)',
                    borderRadius: '8px',
                    padding: '6px 12px',
                    flexShrink: 0,
                }}>
                    <LuZap style={{ width: '14px', height: '14px', color: 'var(--accent)' }} />
                    <span style={{
                        fontFamily: 'Syne, sans-serif',
                        fontWeight: 700,
                        fontSize: '0.8rem',
                        color: 'var(--accent)',
                    }}>
                        {totalCaloriesBurned} kcal quemadas
                    </span>
                </div>
            </div>
        </div>
    );
};

export default DashHeader;