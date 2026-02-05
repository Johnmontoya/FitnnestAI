import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto, UpdateUserDto } from 'src/auth/dto/auth.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) { }

  async create(createUserDto: CreateUserDto) {
    // Verificar si el usuario ya existe
    const existingUser = await this.prisma.user.findFirst({
      where: {
        OR: [
          { email: createUserDto.email },
          { username: createUserDto.username },
        ],
      },
    });

    if (existingUser) {
      throw new ConflictException('Username or email already exists');
    }

    // Calcular calorías basadas en la edad si se proporciona
    let dailyCalorieIntake = createUserDto.dailyCalorieIntake || 2200;
    let dailyCalorieBurn = createUserDto.dailyCalorieBurn || 400;

    if (createUserDto.age && !createUserDto.dailyCalorieIntake) {
      const ageRange = this.getAgeRange(createUserDto.age);
      dailyCalorieIntake = ageRange.maintain;
      dailyCalorieBurn = ageRange.burn;
    }

    // Crear el usuario (la contraseña ya viene hasheada desde AuthService)
    const user = await this.prisma.user.create({
      data: {
        ...createUserDto,
        dailyCalorieIntake,
        dailyCalorieBurn,
      },
      select: {
        id: true,
        email: true,
        username: true,
        name: true,
        age: true,
        weight: true,
        height: true,
        goal: true,
        dailyCalorieIntake: true,
        dailyCalorieBurn: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return user;
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        username: true,
        name: true,
        age: true,
        weight: true,
        height: true,
        goal: true,
        dailyCalorieIntake: true,
        dailyCalorieBurn: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async findById(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async findByUsername(username: string) {
    return this.prisma.user.findUnique({
      where: { username },
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    await this.findOne(id); // Verificar que existe

    // Si se actualiza la edad, recalcular calorías
    if (updateUserDto.age && !updateUserDto.dailyCalorieIntake) {
      const ageRange = this.getAgeRange(updateUserDto.age);
      updateUserDto.dailyCalorieIntake = ageRange.maintain;
      updateUserDto.dailyCalorieBurn = ageRange.burn;
    }

    // Si se actualiza la contraseña, hashearla
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }

    const user = await this.prisma.user.update({
      where: { id },
      data: updateUserDto,
      select: {
        id: true,
        email: true,
        username: true,
        name: true,
        age: true,
        weight: true,
        height: true,
        goal: true,
        dailyCalorieIntake: true,
        dailyCalorieBurn: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return user;
  }

  async remove(id: string) {
    await this.findOne(id); // Verificar que existe

    await this.prisma.user.delete({
      where: { id },
    });

    return { message: 'User deleted successfully' };
  }

  private getAgeRange(age: number) {
    const ageRanges = [
      { max: 15, maintain: 2500, burn: 600 },
      { max: 18, maintain: 2550, burn: 600 },
      { max: 21, maintain: 2500, burn: 550 },
      { max: 24, maintain: 2450, burn: 550 },
      { max: 27, maintain: 2400, burn: 525 },
      { max: 30, maintain: 2350, burn: 500 },
      { max: 33, maintain: 2300, burn: 475 },
      { max: 36, maintain: 2250, burn: 475 },
      { max: 39, maintain: 2200, burn: 450 },
      { max: 42, maintain: 2150, burn: 450 },
      { max: 45, maintain: 2100, burn: 425 },
      { max: 48, maintain: 2050, burn: 425 },
      { max: 51, maintain: 2000, burn: 400 },
      { max: 54, maintain: 1950, burn: 400 },
      { max: 57, maintain: 1900, burn: 375 },
      { max: 60, maintain: 1850, burn: 375 },
      { max: 63, maintain: 1800, burn: 350 },
      { max: 66, maintain: 1750, burn: 350 },
      { max: 69, maintain: 1700, burn: 325 },
      { max: 72, maintain: 1650, burn: 325 },
      { max: 75, maintain: 1600, burn: 300 },
      { max: 120, maintain: 1500, burn: 300 },
    ];

    return ageRanges.find(range => age <= range.max) || ageRanges[ageRanges.length - 1];
  }
}