import Fastify from 'fastify';

const server = Fastify({ logger: true });

server.get('/', (_request, _reply) => {
	return "Hello World"
})

try {
	await server.listen({port: 8000});
} catch (e) {	
	console.error(e)
	process.exit(2)
}