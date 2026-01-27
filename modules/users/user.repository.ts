import { db } from "@/db";
import { users } from "@/db/schema";
import { GetDataTableProps } from "./user.service";
import { asc, eq, ilike, or, sql } from "drizzle-orm";
import { User } from "./user.types";

export const UserRepository = {
    async findAll() {
        const list = await db.select().from(users).orderBy(asc(users.username));
        return list;
    },

    async findUserById(data: Pick<User, "id">) {
        const [user] = await db
            .select()
            .from(users)
            .where(sql`${users.id} = ${data.id}`)
            .limit(1);
        return user;
    },

    async findUserByUsername(data: Pick<User, "username">) {
        const [user] = await db
            .select()
            .from(users)
            .where(ilike(users.username, data.username ?? ""))
            .limit(1);
        return user;
    },

    async existByUsername(data: Pick<User, "username">) {
        const user = await this.findUserByUsername(data);
        return user != null;
    },

    async findWithPagingAndSearch(data: GetDataTableProps) {
        const offset = (data.page - 1) * data.limit;
        const where = data.search
            ? or(
                  sql`${users.id}::text ilike ${`%${data.search}%`}`,
                  ilike(users.username, `%${data.search}%`),
              )
            : undefined;

        const [items, total] = await Promise.all([
            db
                .select()
                .from(users)
                .where(where)
                .limit(data.limit)
                .offset(offset)
                .orderBy(asc(users.username)),
            db
                .select({ count: sql<number>`count(*)` })
                .from(users)
                .where(where),
        ]);

        return { items, total: Number(total[0].count) ?? 0 };
    },

    async insertUserWithUsernameAndBalance(
        data: Pick<User, "username" | "balance">,
    ) {
        const user = await this.findUserByUsername({
            username: data.username,
        });

        if (user) {
            throw new Error("Username duplicated");
        }

        return await db.insert(users).values(data).returning().execute();
    },

    async deleteUserById(data: Pick<User, "id">) {
        await db.delete(users).where(eq(users.id, data.id)).execute();
    },

    async updateUserById(data: Pick<User, "id" | "username" | "balance">) {
        await db
            .update(users)
            .set({
                username: data.username,
                balance: data.balance ?? 0,
            })
            .where(sql`${users.id}::text ilike ${data.id}`)
            .execute();
    },

    async updateBalanceById(data: Pick<User, "id" | "balance">) {
        await db
            .update(users)
            .set({
                balance: data.balance ?? 0,
            })
            .where(sql`${users.id}::text ilike ${data.id}`)
            .execute();
    },

    async total() {
        return await db.select({ count: sql<number>`count(*)` }).from(users);
    },

    async totalBalance() {
        return await db
            .select({ count: sql<number>`sum(balance)` })
            .from(users);
    },
};
