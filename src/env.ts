import * as appError from './common/errors';

export interface IEnvironmentVariables {
    server: {
        JWT_SECRET: string,
    },
    db: {
        DB_HOST: string,
        DB_PORT: number,
        DB_PASSWORD: string,
        DB_NAME: string,
    },
    ombd: {
        OMDB_KEY: string,
    }
};

const _EnvironmentVariables = {
    server: {
        JWT_SECRET: undefined,
    },
    db: {
        DB_HOST: '127.0.0.1',
        DB_PORT: 5432,
        DB_PASSWORD: '124816',
        DB_NAME: 'movieDB',
    },
    ombd: {
        OMDB_KEY: undefined,
    }
};

function loadEnvInto(arg: any) {
    for (let k in arg) {
        if (typeof  arg[k] === 'object') {
            loadEnvInto(arg[k]);
        } else {
            if (undefined !== process.env[k]) {
                arg[k] = process.env[k];
            }
            if (undefined === arg[k]) {
                throw new appError.EnvNotFound(`Environment variable ${k} is not defined.`);
            }
        }
    }
}

export function init() {
    loadEnvInto(_EnvironmentVariables);
}

// @ts-ignore
export const EnvironmentVariables : IEnvironmentVariables = _EnvironmentVariables as IEnvironmentVariables;


