import { prisma } from "../config/prisma.js";
import { drizzleDB } from "../config/drizzle.js";
import { classes } from "../schema.js";

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
