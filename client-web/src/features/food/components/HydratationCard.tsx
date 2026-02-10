import { BiDroplet } from "react-icons/bi";
import { Card, CardContent, CardHeader, CardTitle } from "../../../shared/ui/Card";
import { Button } from "../../../shared/ui/Button";
import type { User } from "../../auth/types/auth.types";

interface HydratationCardProps {
    user: User;
}

const HydratationCard = ({ user }: HydratationCardProps) => {
    const hidratation = {
        agua: user?.weight! * 35,
    }
    return (
        <Card>
            <CardHeader>
                <div className="flex items-center gap-2">
                    <BiDroplet className="w-5 h-5 text-blue-400" />
                    <CardTitle>Hidratación</CardTitle>
                </div>
                <p className="text-gray-400 text-sm mt-1">Meta: {hidratation.agua} Litros</p>
            </CardHeader>
            <CardContent>
                <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-white text-2xl font-bold">{hidratation.agua}L</span>
                        <span className="text-gray-400 text-sm">71%</span>
                    </div>
                    <div className="w-full bg-[#1a2f1a] rounded-full h-3 overflow-hidden">
                        <div
                            className="h-full bg-blue-400 rounded-full transition-all duration-500"
                            style={{ width: '71%' }}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-4 gap-2">
                    {[...Array(8)].map((_, i) => (
                        <button
                            key={i}
                            className={`aspect-square rounded-lg transition-all ${i < 5
                                ? 'bg-blue-400 hover:bg-blue-500'
                                : 'bg-[#1a2f1a] hover:bg-[#2a4a2a]'
                                }`}
                        >
                            <span className="text-xl">{i < 5 ? '💧' : '⚪'}</span>
                        </button>
                    ))}
                </div>

                <Button variant="primary" className="w-full mt-4">
                    +250ml (500ml)
                </Button>
            </CardContent>
        </Card>
    )
}

export default HydratationCard;