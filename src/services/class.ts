import { prisma } from '../config/prisma.js';

export type classFieldFilter = {
	name?: boolean;
	abilBonus?: boolean;
	baseHP?: boolean;
	recoveryDice?: boolean;
	startingGold?: boolean;
	noArmor?: boolean;
	lightArmor?: boolean;
	heavyArmor?: boolean;
	shield?: boolean;
	basicMeleeAttack?: boolean;
	basicRangedAttack?: boolean;
};

export async function findAllClasses(filter: classFieldFilter) {
	try {
		const classes = await prisma.class.findMany({ select: filter });
		return {
			data: classes,
			error: null,
		};
	} catch (error) {
		return {
			data: null,
			error: error,
		};
	}
}
