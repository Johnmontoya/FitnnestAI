import { IsString, IsInt, IsEnum, Min, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum MealType {
  BREAKFAST = 'BREAKFAST',
  LUNCH = 'LUNCH',
  DINNER = 'DINNER',
  SNACK = 'SNACK',
}

export class CreateFoodEntryDto {
  @ApiProperty({ example: 'Pizza' })
  @IsString()
  name: string;

  @ApiProperty({ example: 500 })
  @IsInt()
  @Min(0)
  calories: number;

  @ApiProperty({ example: 'BREAKFAST' })
  @IsEnum(MealType)
  mealType: MealType;

  @ApiProperty({ example: '2022-01-01' })
  @IsString()
  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'date must be in YYYY-MM-DD format',
  })
  date: string;
}

export class UpdateFoodEntryDto {
  @ApiProperty({ example: 'Pizza' })
  @IsString()
  name?: string;

  @ApiProperty({ example: 500 })
  @IsInt()
  @Min(0)
  calories?: number;

  @ApiProperty({ example: 'BREAKFAST' })
  @IsEnum(MealType)
  mealType?: MealType;

  @ApiProperty({ example: '2022-01-01' })
  @IsString()
  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'date must be in YYYY-MM-DD format',
  })
  date?: string;
}
