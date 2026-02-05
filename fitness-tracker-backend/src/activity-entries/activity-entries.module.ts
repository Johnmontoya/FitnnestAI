import { Module } from '@nestjs/common';
import { ActivityEntriesService } from './activity-entries.service';
import { ActivityEntriesController } from './activity-entries.controller';

@Module({
  controllers: [ActivityEntriesController],
  providers: [ActivityEntriesService],
})
export class ActivityEntriesModule {}
