import { ServerConfig } from './config/server.js';
import { createServer } from './server.js';

const {server, start, port} = createServer(ServerConfig)

start(server, port)