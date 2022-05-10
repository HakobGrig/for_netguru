import {MigrationInterface, QueryRunner} from 'typeorm';

export class InitialMigration_1652017826536 implements MigrationInterface {
  async up(qr: QueryRunner) {
    await qr.query(`
        CREATE TABLE IF NOT EXISTS movies(
        uuid VARCHAR(36) PRIMARY KEY not null,
        created_at timestamp with time zone not null,
        updated_at timestamp with time zone not null,
        title VARCHAR(32) not null,
        released timestamp with time zone not null,
        genre VARCHAR(32),
        director VARCHAR(32),
        user_id INTEGER not null
        )`);
  }

  async down(qr: QueryRunner) {
    await qr.query('DROP TABLE IF EXISTS movies');
  }
}
