import { api } from "@/lib/api";
import { User } from "@/modules/users/user.types";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";

export default function useTransferMoney() {
    const router = useRouter();
    const [userList, setUserList] = useState<User[]>();
    const [form, setForm] = useState<string>();
    const [isPending, startTransaction] = useTransition();

    const fetchUserList = async () => {
        const res = await api({
            url: `/api/users/list`,
            method: "GET",
        });

        if (res?.status == "success") {
            setUserList(res.data);
        } else if (res?.status == "error") {
            router.replace("/users");
        }
    };

    const fetchTransferUserMoney = async () => {
        startTransaction(async () => {
            const res = await api({
                url: `/api/users/transfer-money`,
                method: "POST",
                body: form,
            });

            if (res?.status == "success") {
                setUserList(undefined);
                fetchUserList();
            }
        });
    };

    useEffect(() => {
        fetchUserList();
    }, []);

    useEffect(() => {
        if (form != undefined) {
            fetchTransferUserMoney();
        }
    }, [form]);

    return { isPending, userList, setForm };
}
