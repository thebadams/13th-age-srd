import { FastifyReply, FastifyRequest } from "fastify";
import { findAllClasses } from "../services/class.js";

export async function handleAllClasses(request: FastifyRequest, reply: FastifyReply) {
	const classes = await findAllClasses()
	if(classes.data === null) {
		request.log.error(classes.error)
		reply.code(404)
		return {
			data: "There Was An Error",
			code: 404
		}
	}
request.log.info(classes.data)
reply.code(200)
	return {
		data: classes.data,
    code: 200
	}
}