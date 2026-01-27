import { api } from "@/lib/api";
import { User } from "@/modules/users/user.types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type UseUserDetailsProps = {
    id: string;
};

export default function useUserDetails({ id }: UseUserDetailsProps) {
    const [user, setUser] = useState<User>();
    const router = useRouter();

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

    useEffect(() => {
        fetchUser();
    }, []);

    return { user };
}
