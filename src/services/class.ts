import { drizzleDB } from '../config/drizzle.js';
import { classes } from '../db/class.schema.js';

export async function drizzleAllClasses() {
	try {
		const classData = await drizzleDB
			.select({
				name: classes.name,
				abilBonus: classes.abilBonus,
				baseHP: classes.baseHp,
				recoveryDice: classes.recoveryDice,
				startingGold: classes.startingGold,
				noArmor: classes.noArmor,
				lightArmor: classes.lightArmor,
				heavyArmor: classes.heavyArmor,
				shield: classes.shield,
				basicMeleeAttack: classes.basicMeleeAttack,
				basicRangedAttack: classes.basicRangedAttack,
				startingEquipment: classes.startingEquipment,
				oneHandedWeapons: classes.oneHandedWeapons,
				twoHandedWeapons: classes.twoHandedWeapons,
			})
			.from(classes);
		return {
			data: classData,
			error: null,
		};
	} catch (error) {
		return {
			data: null,
			error: error,
		};
	}
}
