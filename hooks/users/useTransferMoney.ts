import { api } from "@/lib/api";
import { User } from "@/modules/users/user.types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export default function useTransferMoney() {
    const router = useRouter();
    const queryClient = useQueryClient();

    const fetchUserList = async () => {
        const res = await api({
            url: `/api/users/list`,
            method: "GET",
        });

        if (res?.status == "success") {
            return res.data as User[];
        } else if (res?.status == "error") {
            router.replace("/users");
        }
    };

    const { data: userList, isFetching: isListFetching } = useQuery({
        queryKey: ["user-list"],
        queryFn: fetchUserList,
    });

    const fetchTransferUserMoney = async (props: { form: string }) => {
        const res = await api({
            url: `/api/users/transfer-money`,
            method: "POST",
            body: props.form,
        });

        if (res?.status == "success") {
            queryClient.invalidateQueries({
                queryKey: ["user-list"],
            });
        }
    };

    const transferMoneyMutation = useMutation({
        mutationKey: ["transfer-money"],
        mutationFn: fetchTransferUserMoney,
    });

    return { isPending: isListFetching, userList, transferMoneyMutation };
}
