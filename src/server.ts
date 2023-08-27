import Fastify, { FastifyInstance } from 'fastify';
import type { ServerConfig } from './config/server.js';
import { registerClassRoutes } from './routes/class.js';


export async function createServer(config: ServerConfig) {
	const PORT = config.port;
	const server = Fastify({ logger: true });
	server.get('/', (_req, _reply) => {
		return {
			message: "Hello World"
		}
	})
	
	void await registerClassRoutes(server)
	const start = async (server: FastifyInstance, port: number) => {
		try {
			void await server.listen({port});
		} catch (error) {
			console.error(error)
			process.exit(2)
		}
	};
	return {server, start, port: PORT}
}