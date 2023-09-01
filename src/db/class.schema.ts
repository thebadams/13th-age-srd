import {
	pgTable,
	uniqueIndex,
	pgEnum,
	serial,
	text,
	integer,
	jsonb,
} from 'drizzle-orm/pg-core';

type ArmorInfo = {
	baseAC: number;
	attackPenalty: number;
};

type ShieldInfo = ArmorInfo & {
	baseAC: 1;
};

type Attack = {
	target: string;
	attack: string;
	hit: string;
	miss: string;
};

type MeleeWeapons = {
	small: {
		weapons: string[];
		attackPenalty: number;
	};
	lightOrSimple: {
		weapons: string[];
		attackPenalty: number;
	};
	heavyOrMartial: {
		weapons: string[];
		attackPenalty: number;
	};
};
export const keyStatus = pgEnum('key_status', [
	'default',
	'valid',
	'invalid',
	'expired',
]);
export const keyType = pgEnum('key_type', [
	'aead-ietf',
	'aead-det',
	'hmacsha512',
	'hmacsha256',
	'auth',
	'shorthash',
	'generichash',
	'kdf',
	'secretbox',
	'secretstream',
	'stream_xchacha20',
]);
export const factorType = pgEnum('factor_type', ['totp', 'webauthn']);
export const factorStatus = pgEnum('factor_status', ['unverified', 'verified']);
export const aalLevel = pgEnum('aal_level', ['aal1', 'aal2', 'aal3']);
export const codeChallengeMethod = pgEnum('code_challenge_method', [
	's256',
	'plain',
]);
export const ability = pgEnum('ability', [
	'Strength',
	'Dexterity',
	'Constitution',
	'Intelligence',
	'Wisdom',
	'Charisma',
]);

export const dice = pgEnum('Dice', ['d4', 'd6', 'd8', 'd10', 'd12', 'd20']);

export const classes = pgTable(
	'classes',
	{
		id: serial('id').primaryKey().notNull(),
		name: text('name').notNull(),
		// TODO: failed to parse database type 'Ability"[]'
		abilBonus: ability('abil_bonus')
			.array()
			.notNull()
			.$type<(typeof ability)[]>(),
		baseHp: integer('base_hp').notNull(),
		recoveryDice: dice('recovery_dice').notNull(),
		startingGold: text('starting_gold').notNull(),
		noArmor: jsonb('no_armor').notNull().$type<ArmorInfo>(),
		lightArmor: jsonb('light_armor').notNull().$type<ArmorInfo>(),
		heavyArmor: jsonb('heavy_armor').notNull().$type<ArmorInfo>(),
		shield: jsonb('shield').notNull().$type<ShieldInfo>(),
		basicMeleeAttack: jsonb('basic_melee_attack').notNull().$type<Attack>(),
		basicRangedAttack: jsonb('basic_ranged_attack').notNull().$type<Attack>(),
		startingEquipment: text('starting_equipment').notNull().default(''),
		oneHandedWeapons: jsonb('one_handed_weapons')
			.notNull()
			.$type<MeleeWeapons>(),
		twoHandedWeapons: jsonb('two_handed_weapons')
			.notNull()
			.$type<MeleeWeapons>(),
	},
	(table) => {
		return {
			nameKey: uniqueIndex('Class_name_key').on(table.name),
		};
	}
);
