import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting seed...');

  // Crear usuario de demostración
  const hashedPassword = await bcrypt.hash('demo123456', 10);

  const demoUser = await prisma.user.upsert({
    where: { username: 'DemoUser' },
    update: {},
    create: {
      username: 'DemoUser',
      email: 'demo@example.com',
      password: hashedPassword,
      name: 'Demo User',
      age: 30,
      weight: 75,
      height: 175,
      goal: 'MAINTAIN',
      dailyCalorieIntake: 2200,
      dailyCalorieBurn: 400,
    },
  });

  console.log('✅ Demo user created:', demoUser.username);

  // Obtener fecha de hoy en formato YYYY-MM-DD
  const today = new Date().toISOString().split('T')[0];

  // Crear entradas de comida
  const foodEntries = await Promise.all([
    prisma.foodEntry.create({
      data: {
        documentId: 'doc_food_1',
        name: 'Oatmeal with Blueberries',
        calories: 300,
        mealType: 'BREAKFAST',
        date: today,
        userId: demoUser.id,
      },
    }),
    prisma.foodEntry.create({
      data: {
        documentId: 'doc_food_2',
        name: 'Grilled Chicken Salad',
        calories: 450,
        mealType: 'LUNCH',
        date: today,
        userId: demoUser.id,
      },
    }),
  ]);

  console.log(`✅ ${foodEntries.length} food entries created`);

  // Crear entrada de actividad
  const activityEntry = await prisma.activityEntry.create({
    data: {
      documentId: 'doc_act_1',
      name: 'Morning Run',
      duration: 30,
      calories: 300,
      date: today,
      userId: demoUser.id,
    },
  });

  console.log('✅ Activity entry created:', activityEntry.name);

  console.log('✨ Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error during seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
