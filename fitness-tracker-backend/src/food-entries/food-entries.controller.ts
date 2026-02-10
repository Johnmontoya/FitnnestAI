import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Request,
  Query,
  Put,
} from '@nestjs/common';
import { FoodEntriesService } from './food-entries.service';
import { AnalyzeFoodDto, CreateFoodEntryDto, UpdateFoodEntryDto } from './dto/food-entry.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('food-entries')
@UseGuards(JwtAuthGuard)
export class FoodEntriesController {
  constructor(private readonly foodEntriesService: FoodEntriesService) {}

  @Post()
  create(@Request() req, @Body() createFoodEntryDto: CreateFoodEntryDto) {
    return this.foodEntriesService.create(req.user.userId, createFoodEntryDto);
  }

  @Get()
  findAll(@Request() req, @Query('date') date?: string) {
    return this.foodEntriesService.findAll(req.user.userId, date);
  }

  @Get('user')
  findAllUser(
    @Request() req, 
    @Query('startOfDay') startOfDay?: string, 
    @Query('endOfDay') endOfDay?: string
  ) {
    return this.foodEntriesService.findAllUser(req.user.userId, startOfDay, endOfDay);
  }

  @Get('stats/:date')
  getStats(@Request() req, @Param('date') date: string) {
    return this.foodEntriesService.getStatsByDate(req.user.userId, date);
  }

  @Post('analyze')
  analyzeFood(@Body() food: AnalyzeFoodDto) {
    return this.foodEntriesService.analyzeFood(food.foodName);
  }

  @Get(':id')
  findOne(@Request() req, @Param('id') id: string) {
    return this.foodEntriesService.findOne(id, req.user.userId);
  }

  @Put(':id')
  update(
    @Request() req,
    @Param('id') id: string,
    @Body() updateFoodEntryDto: UpdateFoodEntryDto,
  ) {
    return this.foodEntriesService.update(id, req.user.userId, updateFoodEntryDto);
  }

  @Delete(':id')
  remove(@Request() req, @Param('id') id: string) {
    return this.foodEntriesService.remove(id, req.user.userId);
  }
}