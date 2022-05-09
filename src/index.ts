import * as storage from './storage'
import * as server from './server';
import * as env from './env';


async function init() {
    await env.init();
    await storage.init();
    await server.init();
    console.log('adsad');
}

init().catch((error)=>{
    console.log('Unable initiate server...');
});

console.log(process.env);