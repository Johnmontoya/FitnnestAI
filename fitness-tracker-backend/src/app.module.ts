import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { FoodEntriesModule } from './food-entries/food-entries.module';
import { ActivityEntriesModule } from './activity-entries/activity-entries.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    PrismaModule,
    UsersModule,
    AuthModule,
    FoodEntriesModule,
    ActivityEntriesModule,
  ],
})
export class AppModule { }
