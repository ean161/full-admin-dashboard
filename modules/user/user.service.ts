import { UserRepository } from "./user.repository"

export type GetDataTableProps = {
    search: string,
    page: number,
    limit: number
}

export const UserService = {
    async getDatatable(data: GetDataTableProps) {
        return await UserRepository.findWithPagingAndSearch(data);
    }
}