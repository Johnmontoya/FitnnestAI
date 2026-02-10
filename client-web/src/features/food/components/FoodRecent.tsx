import { toast } from "sonner";
import { Button } from "../../../shared/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "../../../shared/ui/Card";
import { FoodLogItem } from "../../../shared/ui/FoodLogItem";
import { useFoodDeleteMutation } from "../hooks/mutation/useFoodMutation";
import type { FoodFormData, FoodResponse } from "../types/food.types";

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
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <CardTitle>Comidas de hoy</CardTitle>
                    <Button variant="secondary" size="sm">
                        Comidas recientes
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                <div className="space-y-3">
                    {!foodUser?.foodEntries || foodUser.foodEntries.length === 0 ? (
                        <div className="text-center py-8">
                            <p className="text-gray-400">No hay comidas registradas</p>
                            <p className="text-gray-500 text-sm mt-2">Agrega tu primera comida para comenzar</p>
                        </div>
                    ) : (
                        foodUser.foodEntries.map((log: any) => (
                            <FoodLogItem
                                key={log.id}
                                name={log.name}
                                calories={log.calories}
                                mealType={log.mealType}
                                proteinas={log.proteinas}
                                carbs={log.carbs}
                                fats={log.fats}
                                portion={log.portion}
                                onEdit={() => {
                                    onEdit(log);
                                }}
                                onDelete={() => {
                                    onDelete(log.id);
                                }}
                            />
                        ))
                    )}
                </div>
            </CardContent>
        </Card>
    )
}

export default FoodRecent;