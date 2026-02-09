import { api } from "@/lib/api";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export default function useCreateUser() {
    const router = useRouter();

    const fetchCreateUser = async (props: { form: string }) => {
        const res = await api({
            url: `/api/users`,
            method: "POST",
            body: props.form,
        });

        if (res?.status == "success") {
            router.replace(`/users/${res.data}`);
        }
    };

    const createMutation = useMutation({
        mutationKey: ["create-user"],
        mutationFn: fetchCreateUser,
    });

    return { createMutation };
}
