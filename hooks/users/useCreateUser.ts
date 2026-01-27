import { api } from "@/lib/api";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";

export default function useCreateUser() {
    const router = useRouter();
    const [form, setForm] = useState<string>();
    const [isPending, startTransaction] = useTransition();

    const fetchCreateUser = async () => {
        startTransaction(async () => {
            const res = await api({
                url: `/api/users`,
                method: "POST",
                body: form,
            });

            if (res?.status == "success") {
                setTimeout(() => {
                    router.replace(`/users/${res?.data}`);
                }, 1500);
            }
        });
    };

    useEffect(() => {
        if (form != undefined) {
            fetchCreateUser();
        }
    }, [form]);

    return { isPending, setForm };
}
