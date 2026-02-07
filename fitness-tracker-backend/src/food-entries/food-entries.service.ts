import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateFoodEntryDto, UpdateFoodEntryDto } from './dto/food-entry.dto';

@Injectable()
export class FoodEntriesService {
  constructor(private prisma: PrismaService) { }

  async create(userId: string, createFoodEntryDto: CreateFoodEntryDto) {
    const documentId = `doc_food_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    const foodEntry = await this.prisma.foodEntry.create({
      data: {
        ...createFoodEntryDto,
        documentId,
        userId,
      },
    });

    return foodEntry;
  }

  async findAll(userId: string, date?: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    const foodEntries = await this.prisma.foodEntry.findMany({
      where: {
        userId: user.id,
        date,
      },
      orderBy: { createdAt: 'desc' },
    });

    return foodEntries;
  }

  async findAllUser(userId: string, startOfDay: string, endOfDay: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    const foodEntries = await this.prisma.foodEntry.findMany({
      where: {
        userId: user.id,
        createdAt: { gte: new Date(startOfDay), lte: new Date(endOfDay) },
      },
      orderBy: { createdAt: 'desc' },
    });

    const stats = await this.prisma.foodEntry.aggregate({
      where: { userId: user.id, createdAt: { gte: new Date(startOfDay), lte: new Date(endOfDay) } },
      _sum: {
        calories: true,
        proteinas: true,
        carbs: true,
        fats: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    return { foodEntries, stats };
  }

  async findOne(id: string, userId: string) {
    const foodEntry = await this.prisma.foodEntry.findUnique({
      where: { id },
    });

    if (!foodEntry) {
      throw new NotFoundException('Food entry not found');
    }

    if (foodEntry.userId !== userId) {
      throw new ForbiddenException('Access denied');
    }

    return foodEntry;
  }

  async update(id: string, userId: string, updateFoodEntryDto: UpdateFoodEntryDto) {
    await this.findOne(id, userId);

    const foodEntry = await this.prisma.foodEntry.update({
      where: { id },
      data: updateFoodEntryDto,
    });

    return foodEntry;
  }

  async remove(id: string, userId: string) {
    await this.findOne(id, userId);

    await this.prisma.foodEntry.delete({
      where: { id },
    });

    return { message: 'Food entry deleted successfully' };
  }

  async getStatsByDate(userId: string, date: string) {
    const entries = await this.prisma.foodEntry.findMany({
      where: {
        userId,
        date,
      },
    });

    const totalCalories = entries.reduce((sum, entry) => sum + entry.calories, 0);

    const byMealType = entries.reduce((acc, entry) => {
      if (!acc[entry.mealType]) {
        acc[entry.mealType] = { count: 0, calories: 0 };
      }
      acc[entry.mealType].count++;
      acc[entry.mealType].calories += entry.calories;
      return acc;
    }, {});

    return {
      date,
      totalCalories,
      totalEntries: entries.length,
      byMealType,
      entries,
    };
  }
}
