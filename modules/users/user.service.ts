import { UserRepository } from "./user.repository";
import { TransferUserMoneyProps, User } from "./user.types";

export type GetDataTableProps = {
    search: string;
    page: number;
    limit: number;
};

export const UserService = {
    async getDatatable(data: GetDataTableProps) {
        return await UserRepository.findWithPagingAndSearch(data);
    },

    async getList() {
        return await UserRepository.findAll();
    },

    async getUserById(data: Pick<User, "id">) {
        const user = await UserRepository.findUserById(data);
        if (user == null) {
            throw new Error("User not found");
        }

        return user;
    },

    async create(data: Pick<User, "username" | "balance">) {
        const existUsername = await UserRepository.existByUsername({
            username: data.username,
        });

        if (existUsername) {
            throw new Error("Duplicated username");
        }

        const user =
            await UserRepository.insertUserWithUsernameAndBalance(data);
        return user[0].id;
    },

    async delete(data: Pick<User, "id">) {
        return await UserRepository.deleteUserById(data);
    },

    async update(data: Pick<User, "id" | "username" | "balance">) {
        const target = await this.getUserById(data);
        if (target.username !== data.username) {
            const existUsername = await UserRepository.existByUsername({
                username: data.username,
            });
            if (existUsername) {
                throw new Error("Duplicated username");
            }
        }

        return await UserRepository.updateUserById(data);
    },

    async details(data: Pick<User, "id">) {
        const user = await this.getUserById(data);
        return user;
    },

    async transferMoney(data: TransferUserMoneyProps) {
        if (data.sender == data.receiver) {
            throw new Error("Sender cant be transfer themself");
        }

        const sender = await this.getUserById({
            id: data.sender,
        });
        const receiver = await this.getUserById({
            id: data.receiver,
        });

        const senderBalance = sender.balance ?? 0;
        if (senderBalance < data.amount) {
            throw new Error("Sender balance not enought to transfer");
        }

        await UserRepository.updateBalanceById({
            id: sender.id,
            balance: senderBalance - data.amount,
        });

        await UserRepository.updateBalanceById({
            id: receiver.id,
            balance: (receiver.balance ?? 0) + data.amount,
        });
    },
};
