import {
    doublePrecision,
    pgTable,
    uuid,
    integer,
    varchar,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
    id: uuid("id").defaultRandom().primaryKey(),
    username: varchar("username").unique(),
    balance: doublePrecision("balance"),
});

export const products = pgTable("products", {
    id: uuid("id").defaultRandom().primaryKey(),
    title: varchar("title"),
    price: doublePrecision("price"),
    quantity: integer("quantity"),
});
