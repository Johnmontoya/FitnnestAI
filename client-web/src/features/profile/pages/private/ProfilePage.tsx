import { useState } from 'react';
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
        } catch (error: unknown) {
            const err = error as Error & { response?: { data?: { message?: string } } };
            toast.error(err.response?.data?.message || err.message || 'Error al actualizar el perfil');
        } finally {
            setEditMode(false);
        }
    };

    return (
        <div className="aurora-bg min-h-screen bg-black text-white ml-64 overflow-hidden">
            <Sidebar />
            <div style={{ padding: '2.5rem', maxWidth: '1200px', margin: '0 auto' }}>
                <div className="p-10 max-w-7xl mx-auto animate-fade-up">
                    {/* Header */}
                    <ProfileHeader
                        user={user!}
                        editMode={editMode}
                        handleSubmit={handleSubmit}
                        onSubmit={onSubmit}
                        isSubmitting={isSubmitting}
                        setEditMode={setEditMode}
                    />

                    {/* Navigation Tabs */}
                    <div className="mb-10!">
                        <NavigationTab activeTab={activeTab} setActiveTab={setActiveTab} />
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                            {/* Left Column */}
                            <div className="lg:col-span-2 space-y-8!">
                                {activeTab === 'details' && (
                                    <>
                                        {/* Personal Metrics */}
                                        <PersonalMetric
                                            user={user!}
                                            editMode={editMode}
                                            isSubmitting={isSubmitting}
                                            setEditMode={setEditMode}
                                            register={register}
                                        />

                                        {/* Health Goals */}
                                        <HealGoal
                                            editMode={editMode}
                                            watch={watch}
                                            setValue={setValue}
                                        />

                                        {/* Account Settings */}
                                        <AccountSetting
                                            user={user!}
                                            editMode={editMode}
                                        />
                                    </>
                                )}

                                {activeTab === 'goals' && (
                                    <div className="glass rounded-[32px] p-12! text-center bg-white/[0.02] border border-white/10">
                                        <h2 className="font-display font-black text-2xl text-[var(--accent)] italic mb-4! uppercase tracking-[0.2em]">Bio-Protocolos</h2>
                                        <p className="text-[var(--text-muted)] font-medium text-lg leading-relaxed max-w-lg mx-auto">
                                            Nuestra IA está calibrando módulos de entrenamiento avanzados basados en tu perfil genético-deportivo.
                                        </p>
                                        <div className="mt-8! flex justify-center gap-2">
                                            <div className="w-2 h-2 rounded-full bg-[var(--accent)] animate-ping"></div>
                                            <div className="w-2 h-2 rounded-full bg-[var(--accent)] animate-ping delay-100"></div>
                                            <div className="w-2 h-2 rounded-full bg-[var(--accent)] animate-ping delay-200"></div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Right Column - Calculated Targets */}
                            <div className="sticky top-8 space-y-8!">
                                <ProfileGoal user={user!} />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;