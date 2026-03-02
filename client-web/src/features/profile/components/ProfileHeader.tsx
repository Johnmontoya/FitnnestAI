import { BiCheck, BiEditAlt, BiLogOutCircle, BiRadar } from "react-icons/bi";
import type { UpdateBiometricsRequest, User } from "../../auth/types/auth.types";
import { useAuthStore } from "../../auth/store/useAuthStore";
import moment from "moment";
import type { UseFormHandleSubmit, SubmitHandler } from "react-hook-form";

interface ProfileHeaderProps {
    user: User;
    editMode: boolean;
    handleSubmit: UseFormHandleSubmit<UpdateBiometricsRequest>;
    onSubmit: SubmitHandler<UpdateBiometricsRequest>;
    isSubmitting: boolean;
    setEditMode: (mode: boolean) => void;
}

const ProfileHeader = ({ user, editMode, handleSubmit, onSubmit, isSubmitting, setEditMode }: ProfileHeaderProps) => {
    const { logout } = useAuthStore();

    return (
        <div className="mb-12!">
            <div className="flex items-center gap-2 mb-2!">
                <span className="accent-line"></span>
                <p className="font-display font-bold text-[0.72rem] tracking-[0.2em] uppercase text-[var(--accent)]">
                    Identidad Bio-Digital
                </p>
            </div>

            <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
                <div className="flex items-center gap-8">
                    {/* Premium Avatar Treatment */}
                    <div className="relative group">
                        <div className="absolute inset-0 bg-gradient-to-tr from-[var(--accent)] to-white blur-lg opacity-20 group-hover:opacity-40 transition-opacity rounded-full"></div>
                        <div className="relative w-32 h-32 rounded-full p-1 bg-gradient-to-tr from-[var(--accent)] to-white/[0.1]">
                            <div className="w-full h-full rounded-full bg-black flex items-center justify-center overflow-hidden border-2 border-black">
                                {user?.name ? (
                                    <span className="font-display font-black text-5xl text-white tracking-tighter">
                                        {user.name.charAt(0).toUpperCase()}
                                    </span>
                                ) : (
                                    <div className="w-full h-full bg-[var(--bg-elevated)] animate-pulse"></div>
                                )}
                            </div>
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-10 h-10 bg-black border border-white/10 rounded-full flex items-center justify-center shadow-xl">
                            <BiRadar className="text-[var(--accent)] w-5 h-5 animate-pulse" />
                        </div>
                    </div>

                    <div>
                        <h1 className="font-display font-extrabold text-[3.2rem] text-[var(--text)] tracking-tighter leading-[1] mb-2">
                            {user?.name}
                        </h1>
                        <div className="flex items-center gap-4">
                            <span className="text-[var(--text-muted)] text-sm font-bold uppercase tracking-widest flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]"></span>
                                Miembro desde {moment(user?.createdAt).format('YYYY')}
                            </span>
                            <span className="px-3 py-0.5 rounded-full bg-white/5 border border-white/10 text-[var(--text-subtle)] text-[0.6rem] font-black uppercase tracking-widest">
                                Status: ACTIVO
                            </span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    {editMode ? (
                        <button
                            onClick={handleSubmit(onSubmit)}
                            disabled={isSubmitting}
                            className="px-8! py-3! rounded-xl bg-[var(--accent)] text-black font-display font-black text-sm tracking-widest uppercase hover:shadow-[0_0_25px_var(--accent-glow)] transition-all flex items-center gap-2"
                        >
                            <BiCheck className="text-xl" />
                            Guardar Cambios
                        </button>
                    ) : (
                        <button
                            onClick={() => setEditMode(true)}
                            className="px-8! py-3! rounded-xl bg-white/5 border border-white/10 text-white font-display font-black text-sm tracking-widest uppercase hover:bg-white/10 transition-all flex items-center gap-2"
                        >
                            <BiEditAlt className="text-xl" />
                            Editar Perfil
                        </button>
                    )}
                    <button
                        onClick={logout}
                        className="p-3! rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500 hover:text-white transition-all group"
                        title="Desconectar"
                    >
                        <BiLogOutCircle className="text-2xl group-hover:rotate-12 transition-transform" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProfileHeader;