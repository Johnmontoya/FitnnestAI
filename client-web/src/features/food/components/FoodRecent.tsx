import { toast } from "sonner";
import { useFoodDeleteMutation } from "../hooks/mutation/useFoodMutation";
import type { FoodFormData, FoodResponse } from "../types/food.types";
import { BiEditAlt, BiTrash, BiLayer, BiCollection } from "react-icons/bi";

interface FoodEntry extends FoodFormData {
    id: string;
}

interface FoodRecentProps {
    foodUser: FoodResponse;
    onEdit: (food: FoodEntry) => void;
}

const FoodRecent = ({ foodUser, onEdit }: FoodRecentProps) => {
    const deleteFoodMutation = useFoodDeleteMutation();
    const onDelete = async (id: string) => {
        try {
            await deleteFoodMutation.mutateAsync(id);
            toast.success('Comida eliminada exitosamente');
        } catch (error: any) {
            toast.error(error.response?.data?.message || error.message || 'Error al eliminar la comida');
        }
    };

    return (
        <div className="glass rounded-[32px] border-[var(--border)] p-8!">
            <div className="flex items-center justify-between mb-8!">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[var(--accent)]/10 flex items-center justify-center">
                        <BiLayer className="w-5 h-5 text-[var(--accent)]" />
                    </div>
                    <h3 className="font-display font-extrabold text-xl text-white tracking-tight">Registro de Hoy</h3>
                </div>
                <button className="px-4! py-2! rounded-lg bg-white/5 border border-white/10 text-[var(--accent)] font-bold text-xs uppercase tracking-widest hover:bg-white/10 transition-colors">
                    Historial Completo
                </button>
            </div>

            <div className="space-y-4!">
                {!foodUser?.foodEntries || foodUser.foodEntries.length === 0 ? (
                    <div className="text-center py-12! bg-white/[0.02] rounded-2xl border border-dashed border-white/10">
                        <BiCollection className="w-12 h-12 text-[var(--text-subtle)] mx-auto mb-4 opacity-20" />
                        <p className="font-display font-bold text-[var(--text-muted)] uppercase tracking-widest">Protocolo Vacío</p>
                        <p className="text-[var(--text-subtle)] text-sm mt-1">Inicia tu registro nutricional arriba</p>
                    </div>
                ) : (
                    foodUser.foodEntries.map((log: any) => (
                        <div key={log.id} className="group relative bg-[var(--bg-elevated)]/40 border border-[var(--border)] rounded-2xl p-5! hover:border-[var(--accent)]/30 transition-all duration-300">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-black/40 flex flex-col items-center justify-center border border-white/5">
                                        <span className="text-[var(--accent)] font-display font-black text-sm">{log.calories}</span>
                                        <span className="text-[0.5rem] text-[var(--text-subtle)] font-bold uppercase">Kcal</span>
                                    </div>
                                    <div>
                                        <h4 className="font-display font-bold text-white text-lg tracking-tight leading-tight">{log.name}</h4>
                                        <div className="flex items-center gap-3 mt-1">
                                            <span className="px-2 py-0.5 rounded bg-[var(--accent)]/5 text-[var(--accent)] text-[0.6rem] font-bold uppercase tracking-tighter border border-[var(--accent)]/10">
                                                {log.mealType}
                                            </span>
                                            <span className="text-[var(--text-subtle)] text-[0.7rem] font-medium">
                                                {log.portion} • P: {log.proteinas}g C: {log.carbs}g G: {log.fats}g
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button
                                        onClick={() => onEdit(log)}
                                        className="p-2 rounded-lg bg-white/5 hover:bg-[var(--accent)] hover:text-black text-[var(--text-muted)] transition-all"
                                    >
                                        <BiEditAlt className="w-5 h-5" />
                                    </button>
                                    <button
                                        onClick={() => onDelete(log.id)}
                                        className="p-2 rounded-lg bg-white/5 hover:bg-red-500/20 hover:text-red-500 text-[var(--text-muted)] transition-all"
                                    >
                                        <BiTrash className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default FoodRecent;