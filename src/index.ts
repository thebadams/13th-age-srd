import Fastify from 'fastify';

import { createServer } from './config/server.js';

const {server, start, port} = createServer()

start(server, port)