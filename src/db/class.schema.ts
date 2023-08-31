import {
  pgTable,
  uniqueIndex,
  pgEnum,
  serial,
  text,
  integer,
  jsonb,
  PgArray,
} from "drizzle-orm/pg-core";

import { sql } from "drizzle-orm";
export const keyStatus = pgEnum("key_status", [
  "default",
  "valid",
  "invalid",
  "expired",
]);
export const keyType = pgEnum("key_type", [
  "aead-ietf",
  "aead-det",
  "hmacsha512",
  "hmacsha256",
  "auth",
  "shorthash",
  "generichash",
  "kdf",
  "secretbox",
  "secretstream",
  "stream_xchacha20",
]);
export const factorType = pgEnum("factor_type", ["totp", "webauthn"]);
export const factorStatus = pgEnum("factor_status", ["unverified", "verified"]);
export const aalLevel = pgEnum("aal_level", ["aal1", "aal2", "aal3"]);
export const codeChallengeMethod = pgEnum("code_challenge_method", [
  "s256",
  "plain",
]);
export const ability = pgEnum("ability", [
  "Strength",
  "Dexterity",
  "Constitution",
  "Intelligence",
  "Wisdom",
  "Charisma",
]);

export const dice = pgEnum("Dice", ["d4", "d6", "d8", "d10", "d12", "d20"]);

export const classes = pgTable(
  "classes",
  {
    id: serial("id").primaryKey().notNull(),
    name: text("name").notNull(),
    // TODO: failed to parse database type 'Ability"[]'
    abilBonus: ability("abil_bonus")
      .array()
      .notNull()
      .$type<(typeof ability)[]>(),
    baseHp: integer("base_hp").notNull(),
    recoveryDice: dice("recovery_dice").notNull(),
    startingGold: text("starting_gold").notNull(),
    noArmor: jsonb("no_armor").notNull(),
    lightArmor: jsonb("light_armor").notNull(),
    heavyArmor: jsonb("heavy_armor").notNull(),
    shield: jsonb("shield").notNull(),
    basicMeleeAttack: jsonb("basic_melee_attack").notNull(),
    basicRangedAttack: jsonb("basic_ranged_attack").notNull(),
    startingEquipment: text("starting_equipment").notNull().default(""),
  },
  (table) => {
    return {
      nameKey: uniqueIndex("Class_name_key").on(table.name),
    };
  }
);
