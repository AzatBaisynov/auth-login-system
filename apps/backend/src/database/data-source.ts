import 'dotenv/config';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { DataSource } from 'typeorm';
import { AuthEventEntity } from '../modules/events/entities/auth-event.entity.js';
import { SessionEntity } from '../modules/sessions/entities/session.entity.js';
import { UserEntity } from '../modules/users/entities/user.entity.js';

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error('DATABASE_URL is required');
}

const currentDirectory = dirname(fileURLToPath(import.meta.url));

const dataSource = new DataSource({
  type: 'postgres',
  url: databaseUrl,
  entities: [UserEntity, SessionEntity, AuthEventEntity],
  migrations: [join(currentDirectory, 'migrations/**/*{.ts,.js}')],
  synchronize: false,
});

export default dataSource;
