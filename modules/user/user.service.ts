import { UserRepository } from "./user.repository"
import { User } from "./user.types";

export type GetDataTableProps = {
    search: string,
    page: number,
    limit: number
}

export const UserService = {
    async getDatatable(data: GetDataTableProps) {
        return await UserRepository.findWithPagingAndSearch(data);
    },

    async create(data: Pick<User, "username" | "balance">) {
        return await UserRepository.insertUserWithUsernameAndBalance(data);
    }
}