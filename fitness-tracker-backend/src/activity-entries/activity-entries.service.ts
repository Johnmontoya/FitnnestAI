import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateActivityEntryDto, UpdateActivityEntryDto } from './dto/activity-entry.dto';

@Injectable()
export class ActivityEntriesService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, createActivityEntryDto: CreateActivityEntryDto) {
    const documentId = `doc_act_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    const activityEntry = await this.prisma.activityEntry.create({
      data: {
        ...createActivityEntryDto,
        documentId,
        userId,
      },
    });

    return activityEntry;
  }

  async findAll(userId: string, date?: string) {
    const where: any = { userId };

    if (date) {
      where.date = date;
    }

    return this.prisma.activityEntry.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string, userId: string) {
    const activityEntry = await this.prisma.activityEntry.findUnique({
      where: { id },
    });

    if (!activityEntry) {
      throw new NotFoundException('Activity entry not found');
    }

    if (activityEntry.userId !== userId) {
      throw new ForbiddenException('Access denied');
    }

    return activityEntry;
  }

  async update(id: string, userId: string, updateActivityEntryDto: UpdateActivityEntryDto) {
    await this.findOne(id, userId);

    const activityEntry = await this.prisma.activityEntry.update({
      where: { id },
      data: updateActivityEntryDto,
    });

    return activityEntry;
  }

  async remove(id: string, userId: string) {
    await this.findOne(id, userId);

    await this.prisma.activityEntry.delete({
      where: { id },
    });

    return { message: 'Activity entry deleted successfully' };
  }

  async getStatsByDate(userId: string, date: string) {
    const entries = await this.prisma.activityEntry.findMany({
      where: {
        userId,
        date,
      },
    });

    const totalCalories = entries.reduce((sum, entry) => sum + entry.calories, 0);
    const totalDuration = entries.reduce((sum, entry) => sum + entry.duration, 0);

    return {
      date,
      totalCalories,
      totalDuration,
      totalActivities: entries.length,
      entries,
    };
  }
}
