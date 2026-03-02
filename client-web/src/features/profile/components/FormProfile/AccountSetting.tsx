import { BiShieldQuarter, BiEnvelope, BiLockOpenAlt } from "react-icons/bi";
import type { User } from "../../../auth/types/auth.types";

interface AccountSettingProps {
    user: User;
    editMode: boolean;
}

const AccountSetting = ({ user, editMode }: AccountSettingProps) => {
    return (
        <div className="glass rounded-[32px] border-[var(--border)] p-10!">
            <div className="flex items-center gap-3 mb-10!">
                <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center">
                    <BiShieldQuarter className="w-5 h-5 text-red-400" />
                </div>
                <div>
                    <h3 className="font-display font-extrabold text-xl text-white tracking-tight">Núcleo de Seguridad</h3>
                    <p className="text-[var(--text-muted)] text-[0.7rem] font-bold uppercase tracking-widest mt-1">Configuración del Sistema</p>
                </div>
            </div>

            <div className="space-y-6!">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6! rounded-2xl bg-black/40 border border-white/5 group hover:border-red-500/20 transition-all">
                    <div className="flex items-center gap-5">
                        <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-xl text-[var(--text-muted)]">
                            <BiEnvelope />
                        </div>
                        <div>
                            <span className="block text-[0.6rem] font-black text-[var(--text-muted)] uppercase tracking-widest mb-1!">Email Registrado</span>
                            <span className="font-display font-bold text-white text-lg">{user?.email}</span>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6! rounded-2xl bg-black/40 border border-white/5 group hover:border-[var(--accent)]/20 transition-all">
                    <div className="flex items-center gap-5">
                        <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-xl text-[var(--text-muted)]">
                            <BiLockOpenAlt />
                        </div>
                        <div>
                            <span className="block text-[0.6rem] font-black text-[var(--text-muted)] uppercase tracking-widest mb-1!">Clave de Acceso</span>
                            <span className="font-display font-bold text-white text-lg italic tracking-widest">••••••••••••</span>
                        </div>
                    </div>
                    {editMode ? (
                        <button type="button" className="px-5! py-2! rounded-xl bg-white/5 border border-white/10 text-xs font-black uppercase tracking-widest hover:bg-white/10 transition-all">
                            Cambiar Clave
                        </button>
                    ) : (
                        <div className="px-5! py-2! text-[var(--text-subtle)] text-[0.6rem] font-black uppercase tracking-widest opacity-40">
                            Bloqueado
                        </div>
                    )}
                </div>
            </div>

            <div className="mt-10! p-6! rounded-2xl bg-red-500/5 border border-red-500/10">
                <h4 className="font-display font-black text-[0.65rem] text-red-400 uppercase tracking-widest mb-2">Zona de Riesgo</h4>
                <p className="text-[0.7rem] text-red-500/60 font-medium leading-relaxed mb-4 uppercase tracking-tighter">
                    Toda la información personal y registros de entrenamiento serán permanentemente eliminados. Esta acción no se puede revertir.
                </p>
                <button type="button" className="text-red-400 text-[0.65rem] font-black uppercase tracking-widest border-b border-red-500/20 hover:border-red-500 transition-all">
                    Eliminar Perfil del Sistema
                </button>
            </div>
        </div>
    );
};

export default AccountSetting;