import { FastifyReply, FastifyRequest } from 'fastify';
import { classFieldFilter, findAllClasses } from '../services/class.js';

export async function handleAllClasses(
	request: FastifyRequest,
	reply: FastifyReply
) {
	const filter: classFieldFilter = {
		name: true,
		abilBonus: true,
		baseHP: true,
		recoveryDice: true,
		startingGold: true,
		noArmor: true,
		lightArmor: true,
		heavyArmor: true,
		shield: true,
		basicRangedAttack: true,
		basicMeleeAttack: true,
	};
	const classes = await findAllClasses(filter);
	if (classes.data === null) {
		request.log.error(classes.error);
		reply.code(404);
		return {
			data: 'There Was An Error',
			code: 404,
		};
	}
	request.log.info(classes.data);
	reply.code(200);
	return {
		data: classes.data,
		code: 200,
	};
}
