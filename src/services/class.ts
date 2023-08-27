import {prisma} from '../config/prisma.js'

export async function findAllClasses() {
	try {
		const classes = await prisma.class.findMany({select: {
			name: true,
			abilBonus: true
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