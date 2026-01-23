import { doublePrecision, pgTable, uuid, integer, varchar } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
    id: uuid("id").primaryKey(),
    username: varchar("username").unique(),
    password: varchar("password")
});

export const products = pgTable("products", {
    id: uuid("id").primaryKey(),
    title: varchar("title"),
    price: doublePrecision("price"),
    quantity: integer("quantity")
});