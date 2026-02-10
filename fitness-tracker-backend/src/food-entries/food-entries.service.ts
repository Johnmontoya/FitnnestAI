import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateFoodEntryDto, UpdateFoodEntryDto } from './dto/food-entry.dto';
import main from '../config/gemini';

@Injectable()
export class FoodEntriesService {
  constructor(private prisma: PrismaService) {}

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

    const where: any = { userId: user.id };
    if (date) {
      where.date = date;
    }

    const foodEntries = await this.prisma.foodEntry.findMany({
      where,
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
      where: { 
        userId: user.id, 
        createdAt: { gte: new Date(startOfDay), lte: new Date(endOfDay) } 
      },
      _sum: {
        calories: true,
        proteinas: true,
        carbs: true,
        fats: true,
      },
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
    const totalProteinas = entries.reduce((sum, entry) => sum + (entry.proteinas || 0), 0);
    const totalCarbs = entries.reduce((sum, entry) => sum + (entry.carbs || 0), 0);
    const totalFats = entries.reduce((sum, entry) => sum + (entry.fats || 0), 0);

    const byMealType = entries.reduce((acc, entry) => {
      if (!acc[entry.mealType]) {
        acc[entry.mealType] = { 
          count: 0, 
          calories: 0,
          proteinas: 0,
          carbs: 0,
          fats: 0,
        };
      }
      acc[entry.mealType].count++;
      acc[entry.mealType].calories += entry.calories;
      acc[entry.mealType].proteinas += entry.proteinas || 0;
      acc[entry.mealType].carbs += entry.carbs || 0;
      acc[entry.mealType].fats += entry.fats || 0;
      return acc;
    }, {});

    return {
      date,
      totalCalories,
      totalProteinas,
      totalCarbs,
      totalFats,
      totalEntries: entries.length,
      byMealType,
      entries,
    };
  }

  async analyzeFood(foodName: string) {
    const prompt = `Analiza el alimento: "${foodName}". 
    
Devuelve SOLO un objeto JSON válido (sin markdown, sin explicaciones) con la siguiente estructura exacta:
{
  "nombre": "nombre del alimento",
  "calorias": número_de_calorías_por_100g,
  "proteinas": gramos_de_proteína_por_100g,
  "carbohidratos": gramos_de_carbohidratos_por_100g,
  "grasas": gramos_de_grasas_por_100g,
  "porcion": "porción recomendada en gramos"
}

Importante: Devuelve SOLO el JSON, sin texto adicional, sin bloques de código markdown.`;

    console.log('Analizando:', foodName);
    
    try {
      const response = await main(prompt);
      console.log('Respuesta de Gemini:', response);
      
      // Limpiar la respuesta para extraer solo el JSON
      let jsonString = response.trim();
      
      // Remover bloques de código markdown si existen
      jsonString = jsonString.replace(/```json\s*/g, '');
      jsonString = jsonString.replace(/```\s*/g, '');
      
      // Intentar parsear el JSON
      const nutritionData = JSON.parse(jsonString);
      
      return {
        success: true,
        data: {
          nombre: nutritionData.nombre || foodName,
          calorias: parseInt(nutritionData.calorias) || 0,
          proteinas: parseInt(nutritionData.proteinas) || 0,
          carbohidratos: parseInt(nutritionData.carbohidratos) || 0,
          grasas: parseInt(nutritionData.grasas) || 0,
          porcion: nutritionData.porcion || '100g',
        }
      };
    } catch (error) {
      console.error('Error al analizar alimento:', error);
      
      // Retornar valores por defecto en caso de error
      return {
        success: false,
        error: 'No se pudo analizar el alimento',
        data: {
          nombre: foodName,
          calorias: 0,
          proteinas: 0,
          carbohidratos: 0,
          grasas: 0,
          porcion: '100g',
        }
      };
    }
  }
}