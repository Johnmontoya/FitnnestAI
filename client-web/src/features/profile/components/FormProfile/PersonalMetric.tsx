import { BiEdit, BiUser } from "react-icons/bi"
import { Card, CardContent, CardHeader, CardTitle } from "../../../../shared/ui/Card"
import { Button } from "../../../../shared/ui/Button"
import type { User } from "../../../auth/types/auth.types";

interface PersonalMetricProps {
    user: User;
    editMode: boolean;
    isSubmitting: boolean;
    setEditMode: (editMode: boolean) => void;
    register: any;
}

const PersonalMetric = ({ user, editMode, isSubmitting, setEditMode, register }: PersonalMetricProps) => {
    return (
        <Card>
            <CardHeader>
                <div className="flex items-center gap-2">
                    <BiUser className="w-5 h-5 text-emerald-500" />
                    <CardTitle>Métricas Personales</CardTitle>
                </div>
                <p className="text-gray-400 text-sm mt-1">
                    Edita tu información personal y biometrics
                </p>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <Card padding="p-4" className="border border-[#2a4a2a]">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-gray-400 text-sm">Age</span>
                            {editMode && <BiEdit className="w-3 h-3 text-gray-400" />}
                        </div>
                        {editMode ? (
                            <input
                                type="number"
                                {...register('age', { valueAsNumber: true })}
                                min="13"
                                max="120"
                                className="w-full bg-[#0f1f0f] text-white text-2xl font-bold rounded px-2 py-1"
                            />
                        ) : (
                            <p className="text-white text-2xl font-bold">{user?.age}</p>
                        )}
                        <p className="text-gray-400 text-xs">years</p>
                    </Card>

                    <Card padding="p-4" className="border border-[#2a4a2a]">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-gray-400 text-sm">Weight</span>
                            {editMode && <BiEdit className="w-3 h-3 text-gray-400" />}
                        </div>
                        {editMode ? (
                            <input
                                type="number"
                                {...register('weight', { valueAsNumber: true })}
                                step="0.1"
                                min="30"
                                max="300"
                                className="w-full bg-[#0f1f0f] text-white text-2xl font-bold rounded px-2 py-1"
                            />
                        ) : (
                            <p className="text-white text-2xl font-bold">{user?.weight}</p>
                        )}
                        <p className="text-gray-400 text-xs">kg</p>
                    </Card>

                    <Card padding="p-4" className="border border-[#2a4a2a]">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-gray-400 text-sm">Height</span>
                            {editMode && <BiEdit className="w-3 h-3 text-gray-400" />}
                        </div>
                        {editMode ? (
                            <input
                                type="number"
                                {...register('height', { valueAsNumber: true })}
                                min="100"
                                max="250"
                                className="w-full bg-[#0f1f0f] text-white text-2xl font-bold rounded px-2 py-1"
                            />
                        ) : (
                            <p className="text-white text-2xl font-bold">{user?.height}</p>
                        )}
                        <p className="text-gray-400 text-xs">cm</p>
                    </Card>
                </div>

                {editMode && (
                    <div className="flex gap-3">
                        <Button variant="primary" type='submit' className="flex-1"
                            disabled={isSubmitting}>
                            Guardar cambios
                        </Button>
                        <Button variant="primary" onClick={() => setEditMode(false)}>
                            Cancelar
                        </Button>
                    </div>
                )}
            </CardContent>
        </Card>)
}

export default PersonalMetric