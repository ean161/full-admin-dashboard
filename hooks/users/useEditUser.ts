import { api } from "@/lib/api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

type UseEditUserProps = {
    id: string;
};

export default function useEditUser({ id }: UseEditUserProps) {
    const router = useRouter();

    const fetchUser = async () => {
        const res = await api({
            url: `/api/users/${id}`,
            method: "GET",
        });

        if (res?.status == "success") {
            return res.data;
        } else if (res?.status == "error") {
            router.replace("/users");
        }
    };

    const { data: user, isFetching: isDetailsFetching } = useQuery({
        queryKey: ["user", id],
        queryFn: fetchUser,
    });

    const fetchUpdateUser = async (props: { id: string; form: string }) => {
        await api({
            url: `/api/users/${props.id}`,
            method: "PATCH",
            body: props.form,
        });
    };

    const updateMutation = useMutation({
        mutationKey: ["update-user"],
        mutationFn: fetchUpdateUser,
    });

    const fetchDeleteUser = async (props: { id: string }) => {
        const req = await api({
            url: `/api/users/${props.id}`,
            method: "DELETE",
        });

        if (req?.status == "success") {
            router.replace("/users");
        }
    };

    const deleteMutation = useMutation({
        mutationKey: ["delete-user"],
        mutationFn: fetchDeleteUser,
    });

    return { user, isDetailsFetching, updateMutation, deleteMutation };
}
