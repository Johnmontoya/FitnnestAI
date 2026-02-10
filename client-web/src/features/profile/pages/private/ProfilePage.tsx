import { useState } from 'react';
import { Card, CardHeader, CardTitle } from '../../../../shared/ui/Card';
import { Sidebar } from '../../../../shared/ui/Sidebar';
import { useCurrentUser } from '../../../auth/hooks/queries/useUsers';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { biometricsSchema, type UpdateBiometricsRequest } from '../../../auth/types/auth.types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useProfileMutation } from '../../hooks/mutation/useProfileMutation';
import { toast } from 'sonner';
import ProfileHeader from '../../components/ProfileHeader';
import PersonalMetric from '../../components/FormProfile/PersonalMetric';
import ProfileGoal from '../../components/ProfileGoal';
import HealGoal from '../../components/FormProfile/HealGoal';
import AccountSetting from '../../components/FormProfile/AccountSetting';
import NavigationTab from '../../components/NavigationTab';

const ProfilePage = () => {
    const { data: user } = useCurrentUser();
    const { mutateAsync: updateProfile } = useProfileMutation(user?.id || '');
    const [editMode, setEditMode] = useState(false);
    const [activeTab, setActiveTab] = useState('details');

    const {
        register,
        handleSubmit,
        formState: { isSubmitting },
        setValue,
        watch,
    } = useForm<UpdateBiometricsRequest>({
        resolver: zodResolver(biometricsSchema),
        defaultValues: {
            age: user?.age || 0,
            gender: (user?.gender as 'MALE' | 'FEMALE') || 'MALE',
            weight: user?.weight || 0,
            height: user?.height || 0,
            goal: (user?.goal as "LOSE" | "MAINTAIN" | "GAIN") || "MAINTAIN",
        },
        mode: 'onChange',
    });

    const onSubmit: SubmitHandler<UpdateBiometricsRequest> = async (data) => {
        try {
            await updateProfile(data);
            setEditMode(false);
        } catch (error: any) {
            toast.error(error.response?.data?.message || error.message || 'Error al actualizar el perfil');
        } finally {
            isSubmitting
            setEditMode(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0a150a] text-white ml-64">
            <Sidebar />
            <div className="p-8 max-w-7xl mx-auto">
                {/* Header */}
                <ProfileHeader user={user!} editMode={editMode} handleSubmit={handleSubmit} onSubmit={onSubmit} isSubmitting={isSubmitting} setEditMode={setEditMode} />

                {/* Navigation Tabs */}
                <NavigationTab activeTab={activeTab} setActiveTab={setActiveTab} />

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Left Column */}
                        <div className="lg:col-span-2 space-y-6">
                            {activeTab === 'details' && (
                                <>
                                    {/* Personal Metrics */}
                                    <PersonalMetric user={user!} editMode={editMode} isSubmitting={isSubmitting} setEditMode={setEditMode} register={register} />

                                    {/* Health Goals */}
                                    <HealGoal editMode={editMode} watch={watch} setValue={setValue} />

                                    {/* Account Settings */}
                                    <AccountSetting user={user!} editMode={editMode} />
                                </>
                            )}

                            {activeTab === 'goals' && (
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Actividad en desarrollo...</CardTitle>
                                    </CardHeader>
                                </Card>
                            )}
                        </div>

                        {/* Right Column - Calculated Targets */}
                        <div className="space-y-6">
                            <ProfileGoal user={user!} />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProfilePage;