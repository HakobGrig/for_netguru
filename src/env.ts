import * as appError from './common/errors';

export interface IEnvironmentVariables {
  server: {
    JWT_SECRET: string;
    APP_PORT: string;
  };
  db: {
    DB_HOST: string;
    DB_PORT: string;
    DB_USERNAME: string;
    DB_PASSWORD: string;
    DB_NAME: string;
  };
  ombd: {
    OMDB_KEY: string;
  };
}

const _EnvironmentVariables: IEnvironmentVariables = {
  server: {
    JWT_SECRET: undefined as unknown as string,
    APP_PORT: '3000',
  },
  db: {
    DB_HOST: '127.0.0.1',
    DB_PORT: '5432',
    DB_USERNAME: 'postgres',
    DB_PASSWORD: '124816',
    DB_NAME: 'movieDB',
  },
  ombd: {
    OMDB_KEY: undefined as unknown as string,
  },
};

// eslint-disable-next-line  @typescript-eslint/no-explicit-any
function loadEnvInto(arg: any) {
  for (const k in arg) {
    if (typeof arg[k] === 'object') {
      loadEnvInto(arg[k]);
    } else {
      if (undefined !== process.env[k]) {
        arg[k] = process.env[k];
      }
      if (undefined === arg[k]) {
        throw new appError.EnvNotFound(
          `Environment variable ${k} is not defined.`
        );
      }
    }
  }
}

export function init() {
  loadEnvInto(_EnvironmentVariables);
}

// @typescript-eslint/ban-ts-comment
export const EnvironmentVariables: IEnvironmentVariables =
  _EnvironmentVariables as IEnvironmentVariables;
