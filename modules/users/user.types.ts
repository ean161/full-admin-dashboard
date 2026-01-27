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

export const CreateUserSchema = z.object({
    username: z.string().min(1, "Username is require"),
    balance: z.coerce
        .number("Balance must be a number")
        .min(0, "Balance must be greater than or equal 0")
        .optional()
        .default(0),
});

export const TransferUserMoneySchema = z.object({
    sender: z.string().min(1, "Sender id is require").uuid("Invalid sender id"),
    receiver: z
        .string()
        .min(1, "Receiver user id is require")
        .uuid("Invalid recevier user id"),
    amount: z.coerce
        .number("Amount must be a number")
        .min(1, "Amount must be greater than 0")
        .default(0),
});

export type TransferUserMoneyProps = z.infer<typeof TransferUserMoneySchema>;
