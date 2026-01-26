import { UserRepository } from "./user.repository";
import { User } from "./user.types";

export type GetDataTableProps = {
    search: string;
    page: number;
    limit: number;
};

export const UserService = {
    async getDatatable(data: GetDataTableProps) {
        return await UserRepository.findWithPagingAndSearch(data);
    },

    async create(data: Pick<User, "username" | "balance">) {
        const existUsername = await UserRepository.existByUsername({
            username: data.username,
        });

        if (existUsername) {
            throw new Error("Duplicated username");
        }

        return await UserRepository.insertUserWithUsernameAndBalance(data);
    },

    async delete(data: Pick<User, "id">) {
        return await UserRepository.deleteUserById(data);
    },

    async update(data: Pick<User, "id" | "username" | "balance">) {
        const existUsername = await UserRepository.existByUsername({
            username: data.username,
        });

        if (!existUsername) {
            throw new Error("User not found");
        }

        const target = await UserRepository.findUserById(data);
        if (target.username !== data.username && existUsername) {
            throw new Error("Duplicated username");
        }

        return await UserRepository.updateUserById(data);
    },

    async details(data: Pick<User, "id">) {
        return await UserRepository.findUserById(data);
    },
};
