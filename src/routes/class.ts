import { FastifyInstance } from "fastify";
import { handleAllClasses } from "../handlers/class.js";
export const registerClassRoutes = async (server: FastifyInstance) => {
	server.route({
		method: 'GET',
    url: '/classes',
    handler: handleAllClasses
	})
}