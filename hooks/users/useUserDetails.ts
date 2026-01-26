import { api } from "@/lib/api";
import { User } from "@/modules/users/user.types";
import { useEffect, useState } from "react";

type UseUserDetailsProps = {
    id: string;
};

export default function useUserDetails({ id }: UseUserDetailsProps) {
    const [user, setUser] = useState<User>();

    const fetchUser = async () => {
        const res = await api({
            url: `/api/users/${id}`,
            method: "GET",
        });

        if (res?.status == "success") {
            setUser(res.data);
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    return { user };
}
