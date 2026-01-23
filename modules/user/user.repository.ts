import { db } from "@/db"
import { users } from "@/db/schema"
import { GetDataTableProps } from "./user.service";
import { eq, ilike, or, sql } from "drizzle-orm";
import { User } from "./user.types";

export const UserRepository = {
    async findUserByUsername(data: Pick<User, "username">) {
        const [user] = await db.select()
            .from(users)
            .where(ilike(users.username, data.username ?? ""));
        return user;
    },

    async findWithPagingAndSearch(data: GetDataTableProps) {
        const offset = (data.page - 1) * data.limit;
        const where = data.search
            ? or(
                sql`${users.id}::text ilike ${`%${data.search}%`}`,
                ilike(users.username, `%${data.search}%`)
            )
            : undefined;

        const [items, totalResult] = await Promise.all([
            db.select()
                .from(users)
                .where(where)
                .limit(data.limit)
                .offset(offset),
            db.select({ count: sql<number>`count(*)` })
                .from(users)
                .where(where)
        ]);

        return { items, totalResult };
    },

    async insertUserWithUsernameAndBalance(data: Pick<User, "username" | "balance">) {
        const user = await this.findUserByUsername({
            username: data.username
        });

        if (user) {
            throw new Error("Username duplicated");
        }

        await db.insert(users)
            .values(data)
            .execute();
    }
}