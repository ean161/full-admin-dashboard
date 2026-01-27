import { api } from "@/lib/api";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";

export default function useCreateUser() {
    const router = useRouter();
    const [form, setForm] = useState<string>();
    const [isPending, startTransaction] = useTransition();

    const fetchCreateUser = async () => {
        startTransaction(async () => {
            await api({
                url: `/api/users`,
                method: "POST",
                body: form,
            });
        });
    };

    useEffect(() => {
        if (form != undefined) {
            fetchCreateUser();
        }
    }, [form]);

    return { isPending, setForm };
}
