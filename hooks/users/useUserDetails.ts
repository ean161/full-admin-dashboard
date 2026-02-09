import { api } from "@/lib/api";
import { User } from "@/modules/users/user.types";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

type UseUserDetailsProps = {
    id: string;
};

export default function useUserDetails({ id }: UseUserDetailsProps) {
    const router = useRouter();

    const fetchUser = async (props: { id: string }) => {
        const res = await api({
            url: `/api/users/${props.id}`,
            method: "GET",
        });

        if (res?.status == "success") {
            return res.data as User;
        } else if (res?.status == "error") {
            router.replace("/users");
        }
    };

    const { data: user, isFetching } = useQuery({
        queryKey: ["details", id],
        queryFn: () => fetchUser({ id }),
    });

    return { user, isFetching };
}
