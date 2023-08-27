import { ServerConfig } from './config/server.js';
import { createServer } from './server.js';

const {server, start, port} = await createServer(ServerConfig)

void await start(server, port)