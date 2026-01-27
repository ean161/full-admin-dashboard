import { api } from "@/lib/api";
import { User } from "@/modules/users/user.types";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";

type UseEditUserProps = {
    id: string;
};

export default function useEditUser({ id }: UseEditUserProps) {
    const router = useRouter();
    const [user, setUser] = useState<User>();
    const [form, setForm] = useState<string>();
    const [isPending, startTransaction] = useTransition();

    const fetchUser = async () => {
        const res = await api({
            url: `/api/users/${id}`,
            method: "GET",
        });

        if (res?.status == "success") {
            setUser(res.data);
        } else if (res?.status == "error") {
            router.replace("/users");
        }
    };

    const fetchUpdateUser = async () => {
        startTransaction(async () => {
            await api({
                url: `/api/users/${id}`,
                method: "PATCH",
                body: form,
            });
        });
    };

    const handleDelete = (id: string) => {
        startTransaction(async () => {
            const req = await api({
                url: `/api/users/${id}`,
                method: "DELETE",
            });

            if (req?.status == "success") {
                router.replace("/users");
            }
        });
    };

    useEffect(() => {
        fetchUser();
    }, []);

    useEffect(() => {
        if (form != undefined) {
            fetchUpdateUser();
        }
    }, [form]);

    return { isPending, user, setForm, handleDelete };
}
