import {Movie} from "./storage/entities/movie";
import {InitialMigration_1652017826536} from "./storage/migrations";

export const EnvironmentVariables = {
    server: {
        JWT_SECRET: undefined,
    },
    db: {
        DB_HOST: '127.0.0.1',
        DB_PORT: 5432,
        DB_PASSWORD: '124816',
        DB_NAME: 'movieDB',
    }
};

export function init() {
    loadEnvInto(EnvironmentVariables);
}

function loadEnvInto(arg: any) {
    for (let k in arg) {
        if (typeof  arg[k] === 'object') {
            loadEnvInto(arg[k]);
        } else {
            if (undefined !== process.env[k]) {
                arg[k] = process.env[k];
            }
            if (undefined === arg[k]) {
                throw new Error(`Environment variable ${k} is not defined.`);
            }
        }
    }
}

