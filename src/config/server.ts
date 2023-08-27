import Fastify, { FastifyInstance } from 'fastify';



export function createServer() {
	const PORT = 8000;
	const server = Fastify({ logger: true });
	server.get('/', (_req, _reply) => {
		return {
			message: "Hello World"
		}
	})
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