import { FiTarget } from "react-icons/fi";
import { Card, CardContent, CardHeader, CardTitle } from "../../../../shared/ui/Card";

interface HealGoalProps {
    editMode: boolean;
    watch: (name: string) => string;
    setValue: any;
}

const HealGoal = ({ editMode, watch, setValue }: HealGoalProps) => {
    const goalOptions: { value: string; label: string }[] = [
        { value: "LOSE", label: "Perder Peso" },
        { value: "MAINTAIN", label: "Mantener Peso" },
        { value: "GAIN", label: "Ganar Masa Muscular" },
    ];
    return (
        <Card>
            <CardHeader>
                <div className="flex items-center gap-2">
                    <FiTarget className="w-5 h-5 text-emerald-500" />
                    <CardTitle>Objetivos de Salud</CardTitle>
                </div>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {goalOptions.map((option) => (
                        <button
                            key={option.value}
                            type="button"           // ← importante
                            onClick={() => {
                                if (editMode) {
                                    setValue('goal', option.value as "LOSE" | "MAINTAIN" | "GAIN", {
                                        shouldValidate: true,
                                        shouldDirty: true,
                                    });
                                }
                            }}
                            disabled={!editMode}
                            className={`w-full p-4 rounded-xl border-2 transition-all text-left ${watch('goal') === option.value   // ← usa watch para ver el valor actual
                                ? 'border-emerald-500 bg-emerald-500 bg-opacity-10'
                                : 'border-[#2a4a2a] hover:border-[#3a5a3a]'
                                } ${!editMode && 'cursor-default opacity-70'}`}
                        >
                            <div className="flex items-center justify-between">
                                <span className="text-white font-semibold">{option.label}</span>
                                {watch('goal') === option.value && (
                                    <div className="w-6 h-6 bg-[#00ff66] rounded-full flex items-center justify-center">
                                        <span className="text-black text-sm">✓</span>
                                    </div>
                                )}
                            </div>
                        </button>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}

export default HealGoal;