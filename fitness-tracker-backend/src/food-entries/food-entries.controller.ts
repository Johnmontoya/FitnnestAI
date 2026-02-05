import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  Query,
} from '@nestjs/common';
import { FoodEntriesService } from './food-entries.service';
import { CreateFoodEntryDto, UpdateFoodEntryDto } from './dto/food-entry.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Food-entries')
@Controller('food-entries')
@UseGuards(JwtAuthGuard)
export class FoodEntriesController {
  constructor(private readonly foodEntriesService: FoodEntriesService) { }

  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Crear una nueva entrada de comida' })
  create(@Request() req, @Body() createFoodEntryDto: CreateFoodEntryDto) {
    return this.foodEntriesService.create(req.user.userId, createFoodEntryDto);
  }

  @Get()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obtener todas las entradas de comida' })
  findAll(@Request() req, @Query('date') date?: string) {
    return this.foodEntriesService.findAll(req.user.userId, date);
  }

  @Get('stats/:date')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obtener estadísticas de las entradas de comida' })
  getStats(@Request() req, @Param('date') date: string) {
    return this.foodEntriesService.getStatsByDate(req.user.userId, date);
  }

  @Get(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obtener una entrada de comida por ID' })
  findOne(@Request() req, @Param('id') id: string) {
    return this.foodEntriesService.findOne(id, req.user.userId);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Actualizar una entrada de comida por ID' })
  update(
    @Request() req,
    @Param('id') id: string,
    @Body() updateFoodEntryDto: UpdateFoodEntryDto,
  ) {
    return this.foodEntriesService.update(id, req.user.userId, updateFoodEntryDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Eliminar una entrada de comida por ID' })
  remove(@Request() req, @Param('id') id: string) {
    return this.foodEntriesService.remove(id, req.user.userId);
  }
}
