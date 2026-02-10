import { BiCoffee, BiCookie, BiMoon, BiSun } from "react-icons/bi";
import { Card } from "../../../shared/ui/Card";

interface StatsFoodProps {
    mealTotals: {
        breakfast: number;
        lunch: number;
        dinner: number;
        snacks: number;
    };
}

const StatsFood = ({ mealTotals }: StatsFoodProps) => {
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card padding="p-4">
                <div className="flex items-center gap-2 mb-2">
                    <BiCoffee className="w-5 h-5 text-amber-500" />
                    <span className="text-gray-400 text-sm font-medium">Desayuno</span>
                </div>
                <p className="text-white text-2xl font-bold">{mealTotals.breakfast}</p>
                <p className="text-gray-400 text-xs">kcal</p>
            </Card>

            <Card padding="p-4">
                <div className="flex items-center gap-2 mb-2">
                    <BiSun className="w-5 h-5 text-orange-500" />
                    <span className="text-gray-400 text-sm font-medium">Almuerzo</span>
                </div>
                <p className="text-white text-2xl font-bold">{mealTotals.lunch}</p>
                <p className="text-gray-400 text-xs">kcal</p>
            </Card>

            <Card padding="p-4">
                <div className="flex items-center gap-2 mb-2">
                    <BiMoon className="w-5 h-5 text-indigo-500" />
                    <span className="text-gray-400 text-sm font-medium">Cena</span>
                </div>
                <p className="text-white text-2xl font-bold">{mealTotals.dinner}</p>
                <p className="text-gray-400 text-xs">kcal</p>
            </Card>

            <Card padding="p-4">
                <div className="flex items-center gap-2 mb-2">
                    <BiCookie className="w-5 h-5 text-pink-500" />
                    <span className="text-gray-400 text-sm font-medium">Snacks</span>
                </div>
                <p className="text-white text-2xl font-bold">{mealTotals.snacks}</p>
                <p className="text-gray-400 text-xs">kcal</p>
            </Card>
        </div>
    )
}

export default StatsFood;