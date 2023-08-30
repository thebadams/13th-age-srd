import {
  pgTable,
  uniqueIndex,
  pgEnum,
  serial,
  text,
  integer,
  jsonb,
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
export const ability = pgEnum("Ability", [
  "Strength",
  "Dexterity",
  "Constitution",
  "Intelligence",
  "Wisdom",
  "Charisma",
]);
export const dice = pgEnum("Dice", ["d4", "d6", "d8", "d10", "d12", "d20"]);

export const classes = pgTable(
  "Class",
  {
    id: serial("id").primaryKey().notNull(),
    name: text("name").notNull(),
    // TODO: failed to parse database type 'Ability"[]'
    abilBonus: ability("abilBonus").array(),
    baseHp: integer("baseHP").notNull(),
    recoveryDice: dice("recoveryDice").notNull(),
    startingGold: text("startingGold").notNull(),
    noArmor: jsonb("noArmor").notNull(),
    lightArmor: jsonb("lightArmor").notNull(),
    heavyArmor: jsonb("heavyArmor").notNull(),
    shield: jsonb("shield").notNull(),
    basicMeleeAttack: jsonb("basicMeleeAttack").notNull(),
    basicRangedAttack: jsonb("basicRangedAttack").notNull(),
  },
  (table) => {
    return {
      nameKey: uniqueIndex("Class_name_key").on(table.name),
    };
  }
);
