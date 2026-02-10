/*
  Warnings:

  - You are about to drop the column `CalorieIntake` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "food_entries" ADD COLUMN     "waterIntake" INTEGER;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "CalorieIntake",
ADD COLUMN     "dailyWaterIntake" INTEGER NOT NULL DEFAULT 0;
