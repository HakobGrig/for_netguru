import {DataSource} from "typeorm";
import {
        InitialMigration_1652017826536
} from  './migrations/'
import {
    Movie
} from './entities/movie';

export const ds = new DataSource(
    {
        type: 'postgres',
        synchronize: false,
        host: '127.0.0.1',
        port: 5432,
        username: 'postgres',
        password: '124816',
        database: 'movieDB',
        entities: [Movie],
        migrations: [InitialMigration_1652017826536],
    });

export async function init() {
        console.log('DB init');
        await ds.initialize();
        await ds.runMigrations();
};