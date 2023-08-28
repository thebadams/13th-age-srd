import {prisma} from '../config/prisma.js'

export async function findAllClasses() {
	try {
		const classes = await prisma.class.findMany({select: {
			name: true,
			abilBonus: true,
			baseHP: true,
			recoveryDice: true,
			startingGold: true,
			noArmor: true,
			lightArmor: true,
			heavyArmor: true,
			shield: true,
			basicMeleeAttack: true
		}})
		return {
			data: classes,
			error: null
		}
	} catch (error) {
		return {
			data: null,
      error: error
		}
	}
}