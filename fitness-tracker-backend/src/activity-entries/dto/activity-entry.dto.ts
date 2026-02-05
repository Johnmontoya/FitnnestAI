import { IsString, IsInt, Min, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateActivityEntryDto {
  @ApiProperty({ example: 'Running' })
  @IsString()
  name: string;

  @ApiProperty({ example: 30 })
  @IsInt()
  @Min(1)
  duration: number; // en minutos

  @ApiProperty({ example: 300 })
  @IsInt()
  @Min(0)
  calories: number;

  @ApiProperty({ example: '2022-01-01' })
  @IsString()
  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'date must be in YYYY-MM-DD format',
  })
  date: string;
}

export class UpdateActivityEntryDto {
  @ApiProperty({ example: 'Running' })
  @IsString()
  name?: string;

  @ApiProperty({ example: 30 })
  @IsInt()
  @Min(1)
  duration?: number;

  @ApiProperty({ example: 300 })
  @IsInt()
  @Min(0)
  calories?: number;

  @ApiProperty({ example: '2022-01-01' })
  @IsString()
  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'date must be in YYYY-MM-DD format',
  })
  date?: string;
}
