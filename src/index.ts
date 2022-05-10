import * as env from './env';
env.init();

import * as storage from './storage';
import * as server from './server';

async function init() {
  await storage.init();
  await server.init();
}

init().catch(error => {
  console.log('Unable to start server...', error.message);
  console.log('Environment variables: \n', env.EnvironmentVariables);
});
