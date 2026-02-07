import { Module } from '@nestjs/common';
import { FoodEntriesService } from './food-entries.service';
import { FoodEntriesController } from './food-entries.controller';

@Module({
  controllers: [FoodEntriesController],
  providers: [FoodEntriesService],
  exports: [FoodEntriesService],
})
export class FoodEntriesModule { }
