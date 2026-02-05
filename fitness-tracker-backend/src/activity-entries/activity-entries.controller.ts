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
import { ActivityEntriesService } from './activity-entries.service';
import { CreateActivityEntryDto, UpdateActivityEntryDto } from './dto/activity-entry.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Activity-entries')
@Controller('activity-entries')
@UseGuards(JwtAuthGuard)
export class ActivityEntriesController {
  constructor(private readonly activityEntriesService: ActivityEntriesService) { }

  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Crear una nueva entrada de actividad' })
  create(@Request() req, @Body() createActivityEntryDto: CreateActivityEntryDto) {
    return this.activityEntriesService.create(req.user.userId, createActivityEntryDto);
  }

  @Get()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obtener todas las entradas de actividad' })
  findAll(@Request() req, @Query('date') date?: string) {
    return this.activityEntriesService.findAll(req.user.userId, date);
  }

  @Get('stats/:date')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obtener estadísticas de las entradas de actividad' })
  getStats(@Request() req, @Param('date') date: string) {
    return this.activityEntriesService.getStatsByDate(req.user.userId, date);
  }

  @Get(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obtener una entrada de actividad por ID' })
  findOne(@Request() req, @Param('id') id: string) {
    return this.activityEntriesService.findOne(id, req.user.userId);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Actualizar una entrada de actividad por ID' })
  update(
    @Request() req,
    @Param('id') id: string,
    @Body() updateActivityEntryDto: UpdateActivityEntryDto,
  ) {
    return this.activityEntriesService.update(id, req.user.userId, updateActivityEntryDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Eliminar una entrada de actividad por ID' })
  remove(@Request() req, @Param('id') id: string) {
    return this.activityEntriesService.remove(id, req.user.userId);
  }
}
