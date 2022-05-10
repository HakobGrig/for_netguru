import {DataSource} from 'typeorm';

import {EnvironmentVariables} from '../env';
import {InitialMigration_1652017826536} from './migrations/';
import {Movie} from './entities/movie';

export const ds = new DataSource({
  type: 'postgres',
  synchronize: false,
  host: EnvironmentVariables.db.DB_HOST,
  port: +EnvironmentVariables.db.DB_PORT,
  username: EnvironmentVariables.db.DB_USERNAME,
  password: EnvironmentVariables.db.DB_PASSWORD,
  database: EnvironmentVariables.db.DB_NAME,
  entities: [Movie],
  migrations: [InitialMigration_1652017826536],
});

export async function init() {
  console.log(EnvironmentVariables.db.DB_PASSWORD);
  console.log('DB init');
  await ds.initialize();
  await ds.runMigrations();
}
