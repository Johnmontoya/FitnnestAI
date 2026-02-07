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
  Put,
} from '@nestjs/common';
import { FoodEntriesService } from './food-entries.service';
import { CreateFoodEntryDto, UpdateFoodEntryDto } from './dto/food-entry.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';

@ApiTags('Food-entries')
@Controller('food-entries')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class FoodEntriesController {
  constructor(private readonly foodEntriesService: FoodEntriesService) { }

  @Post()
  @ApiOperation({ summary: 'Crear una nueva entrada de comida' })
  create(@Request() req, @Body() createFoodEntryDto: CreateFoodEntryDto) {
    return this.foodEntriesService.create(req.user.userId, createFoodEntryDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todas las entradas de comida' })
  findAll(@Request() req, @Query('date') date?: string) {
    return this.foodEntriesService.findAll(req.user.userId, date);
  }

  @Get('user')
  @ApiOperation({ summary: 'Obtener todas las entradas de comida del usuario' })
  findAllUser(@Request() req, @Query('startOfDay') startOfDay?: string, @Query('endOfDay') endOfDay?: string) {
    return this.foodEntriesService.findAllUser(req.user.userId, startOfDay, endOfDay);
  }

  @Get('stats/:date')
  @ApiOperation({ summary: 'Obtener estadísticas de las entradas de comida' })
  getStats(@Request() req, @Param('date') date: string) {
    return this.foodEntriesService.getStatsByDate(req.user.userId, date);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una entrada de comida por ID' })
  findOne(@Request() req, @Param('id') id: string) {
    return this.foodEntriesService.findOne(id, req.user.userId);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar una entrada de comida por ID' })
  update(
    @Request() req,
    @Param('id') id: string,
    @Body() updateFoodEntryDto: UpdateFoodEntryDto,
  ) {
    return this.foodEntriesService.update(id, req.user.userId, updateFoodEntryDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una entrada de comida por ID' })
  remove(@Request() req, @Param('id') id: string) {
    return this.foodEntriesService.remove(id, req.user.userId);
  }
}
