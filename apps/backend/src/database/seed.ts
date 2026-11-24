import 'dotenv/config';
import * as argon2 from 'argon2';
import dataSource from './data-source.js';
import { UserRole } from '../modules/users/enums/user-role.enum.js';
import { UserEntity } from '../modules/users/entities/user.entity.js';

const adminPassword = process.env.SEED_ADMIN_PASSWORD;
const demoPassword = process.env.DEMO_USER_PASSWORD;

if (!adminPassword || !demoPassword) {
  throw new Error('SEED_ADMIN_PASSWORD and DEMO_USER_PASSWORD are required');
}

const users = [
  {
    login: process.env.SEED_ADMIN_LOGIN ?? 'admin',
    displayName: 'Администратор',
    role: UserRole.ADMIN,
    password: adminPassword,
  },
  ...Array.from({ length: 5 }, (_, index) => ({
    login: `trainee${index + 1}`,
    displayName: `Стажёр ${index + 1}`,
    role: UserRole.USER,
    password: demoPassword,
  })),
];

async function seed() {
  await dataSource.initialize();

  try {
    const repository = dataSource.getRepository(UserEntity);

    for (const user of users) {
      const existing = await repository.findOneBy({ login: user.login });

      if (existing) continue;

      const passwordHash = await argon2.hash(user.password, {
        type: argon2.argon2id,
      });

      await repository.save(
        repository.create({
          login: user.login,
          displayName: user.displayName,
          role: user.role,
          passwordHash,
        }),
      );
    }

    console.log('Seed completed');
  } finally {
    await dataSource.destroy();
  }
}

seed().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});
