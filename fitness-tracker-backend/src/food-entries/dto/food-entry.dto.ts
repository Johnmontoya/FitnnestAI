import { IsString, IsInt, IsEnum, Min, Matches, IsOptional } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export enum MealType {
  BREAKFAST = 'BREAKFAST',
  LUNCH = 'LUNCH',
  DINNER = 'DINNER',
  SNACK = 'SNACK',
}

export class CreateFoodEntryDto {
  @IsString()
  name: string;

  @IsInt()
  @Min(0)
  calories: number;

  @IsEnum(MealType)
  mealType: MealType;

  @IsOptional()
  @IsInt()
  @Min(0)
  proteinas?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  carbs?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  fats?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  portion?: number;

  @IsString()
  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'date must be in YYYY-MM-DD format',
  })
  date: string;
}

export class UpdateFoodEntryDto extends PartialType(CreateFoodEntryDto) {}

export class AnalyzeFoodDto {
  @IsString()
  foodName: string;
}