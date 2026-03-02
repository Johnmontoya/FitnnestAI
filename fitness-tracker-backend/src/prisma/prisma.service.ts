import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor() {
    super({
      log: process.env.NODE_ENV === 'development' ? ['query', 'info', 'warn', 'error'] : ['error'],
    } as any); // Usamos 'as any' para evitar conflictos de tipos
  }

  async onModuleInit() {
    await this.$connect();
    console.log('✅ Prisma conectado a la base de datos');
  }

  async onModuleDestroy() {
    await this.$disconnect();
    console.log('👋 Prisma desconectado de la base de datos');
  }

  // Método helper para transacciones
  async executeTransaction<T>(fn: (prisma: PrismaClient) => Promise<T>): Promise<T> {
    return await this.$transaction(fn);
  }
}
