import * as env from './env';

// Init environment variables first
try {
  env.init();
} catch (error) {
  if (error instanceof Error) {
    console.log('Unable to initialize env variables...', error.message);
  }

  // eslint-disable-next-line no-process-exit
  process.exit(-1);
}
console.log('Environment variables: \n', env.EnvironmentVariables);




import * as storage from './storage';
import * as server from './server';

async function init() {
  await storage.init();
  await server.init();
}

// Init storage and server
init().catch(error => {
  console.log('Unable to start server...', error.message);

  // eslint-disable-next-line no-process-exit
  process.exit(-1);
});
