import { IsEmail, IsString, IsOptional, IsInt, IsNumber, IsEnum, MinLength, Min } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';

export enum Goal {
    LOSE = 'LOSE',
    MAINTAIN = 'MAINTAIN',
    GAIN = 'GAIN',
}

export enum Gender {
    MALE = 'MALE',
    FEMALE = 'FEMALE',
}

export class CreateUserDto {
    @ApiProperty({ example: 'john@example.com' })
    @IsEmail({}, { message: 'Email inválido' })
    email: string;

    @ApiProperty({ example: 'john' })
    @IsString()
    @MinLength(3)
    username: string;

    @ApiProperty({ example: 'password123' })
    @IsString()
    @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
    password: string;

    @ApiProperty({ example: 'John Doe' })
    @IsOptional()
    @IsString()
    name?: string;

    @ApiProperty({ example: 25 })
    @IsOptional()
    @IsInt()
    @Min(1)
    age?: number;

    @ApiProperty({ example: 'MALE' })
    @IsOptional()
    @IsEnum(Gender)
    gender?: Gender;

    @ApiProperty({ example: 70 })
    @IsOptional()
    @IsNumber()
    @Min(1)
    weight?: number;

    @ApiProperty({ example: 1.75 })
    @IsOptional()
    @IsNumber()
    @Min(1)
    height?: number;

    @ApiProperty({ example: 'LOSE' })
    @IsOptional()
    @IsEnum(Goal)
    goal?: Goal;

    @ApiProperty({ example: 2000 })
    @IsOptional()
    @IsInt()
    @Min(0)
    dailyCalorieIntake?: number;

    @ApiProperty({ example: 500 })
    @IsOptional()
    @IsInt()
    @Min(0)
    dailyCalorieBurn?: number;

    @ApiProperty({ example: 2000 })
    @IsOptional()
    @IsInt()
    @Min(0)
    dailyWaterIntake?: number;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @IsOptional()
    @IsString()
    password?: string;
}

export class LoginDto {
    @ApiProperty({ example: 'john@example.com' })
    @IsEmail({}, { message: 'Email inválido' })
    email: string;

    @ApiProperty({ example: 'password123' })
    @IsString()
    @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
    password: string;
}