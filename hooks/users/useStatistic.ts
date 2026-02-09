import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

type StatisticData = {
    totalUser: number;
    totalBalance: number;
    averageBalance: number;
};

export default function UseStatistic() {
    const fetchStatistic = async () => {
        const res = await api({
            url: "/api/users/statistic",
            method: "GET",
        });

        if (res?.status == "success") {
            return res.data;
        }
    };

    const { data, isFetching } = useQuery({
        queryKey: ["statistic"],
        queryFn: fetchStatistic,
    });

    return { isPending: isFetching, statistic: data };
}
