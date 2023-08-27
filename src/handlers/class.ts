import { FastifyReply, FastifyRequest } from "fastify";
import { findAllClasses } from "../services/class.js";

export async function handleAllClasses(_request: FastifyRequest, reply: FastifyReply) {
	const classes = await findAllClasses()
	if(classes.data === null) {
		reply.code(404)
		return {
			data: "There Was An Error",
			code: 404
		}
	}
reply.code(200)
	return {
		data: classes.data,
    code: 200
	}
}