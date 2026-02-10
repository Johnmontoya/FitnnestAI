import type { User } from "../../features/auth/types/auth.types";

export const calculateData = (user: User) => {
    let dailyCalories = user?.dailyCalorieIntake!;
    if (user?.goal === 'LOSE') dailyCalories -= 500;
    if (user?.goal === 'GAIN') dailyCalories += 500;

    return {
        dailyCalories
    }
}