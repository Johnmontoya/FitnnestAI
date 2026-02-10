import { BiUser } from "react-icons/bi";
import { Button } from "../../../shared/ui/Button";
import moment from "moment";
import type { User } from "../../auth/types/auth.types";

interface ProfileHeaderProps {
    user: User;
    editMode: boolean;
    handleSubmit: (onSubmit: (data: any) => void) => (e?: React.BaseSyntheticEvent<object, any, any> | undefined) => Promise<void>;
    onSubmit: (data: any) => void;
    isSubmitting: boolean;
    setEditMode: (editMode: boolean) => void;
}

const ProfileHeader = ({ user, editMode, handleSubmit, onSubmit, isSubmitting, setEditMode }: ProfileHeaderProps) => {
    return (
        <div className="mb-8">
            <div className="flex items-start justify-between">
                <div className="flex items-center gap-6">
                    {/* Avatar */}
                    <div className="relative">
                        <div className="w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center">
                            <BiUser className="w-12 h-12 text-black" />
                        </div>
                        <div className="absolute bottom-0 right-0 w-6 h-6 bg-[#00ff66] rounded-full border-4 border-[#0a150a]"></div>
                    </div>

                    {/* User Info */}
                    <div>
                        <h1 className="text-3xl font-bold mb-1">{user?.username}</h1>
                        <p className="text-gray-400 mb-2">Miembro desde {moment(user?.createdAt).format("DD/MM/YYYY")} • Última sincronización: {moment(user?.updatedAt).fromNow()}</p>
                        <div className="flex gap-2">
                            <span className="px-3 py-1 bg-emerald-500 bg-opacity-20 text-slate-100 rounded-full text-xs font-semibold">
                                ATLETA ACTIVO
                            </span>
                        </div>
                    </div>
                </div>

                <Button
                    variant="primary"
                    type="submit"
                    onClick={() => {
                        if (editMode) {
                            handleSubmit(onSubmit)();   // ← dispara el submit manualmente
                        } else {
                            setEditMode(true);
                        }
                    }}
                    disabled={isSubmitting}
                >
                    {editMode ? (
                        isSubmitting ? 'Guardando...' : 'Guardar Cambios'
                    ) : (
                        'Editar Perfil'
                    )}
                </Button>
            </div>
        </div>
    );
};

export default ProfileHeader;