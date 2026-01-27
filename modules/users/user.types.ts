import { z } from "zod";
import { users } from "@/db/schema";

export type User = typeof users.$inferSelect;

export const EditUserSchema = z.object({
    id: z.string().min(1, "ID is require").uuid("Invalid user id"),
    username: z.string().min(1, "Username is require"),
    balance: z.coerce
        .number("Balance must be a number")
        .min(0, "Balance must be greater than or equal 0")
        .optional()
        .default(0),
});
