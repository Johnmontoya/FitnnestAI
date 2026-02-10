import { LuLock } from "react-icons/lu";
import { Card, CardContent, CardHeader, CardTitle } from "../../../../shared/ui/Card";
import { Input } from "../../../../shared/ui/Input";

interface AccountSettingProps {
    user: any;
    editMode: boolean;
}

const AccountSetting = ({ user, editMode }: AccountSettingProps) => {
    return (
        <Card>
            <CardHeader>
                <div className="flex items-center gap-2">
                    <LuLock className="w-5 h-5 text-emerald-500" />
                    <CardTitle>Configuración de Cuenta</CardTitle>
                </div>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <Input
                        label="Username"
                        value={user?.username}
                        disabled={!editMode}
                    />
                    <Input
                        label="Email Address"
                        type="email"
                        value={user?.email}
                        disabled={!editMode}
                    />
                </div>
            </CardContent>
        </Card>
    )
}

export default AccountSetting;