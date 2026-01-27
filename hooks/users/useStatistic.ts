import { api } from "@/lib/api";
import { useEffect, useState, useTransition } from "react";

type StatisticData = {
    totalUser: number;
    totalBalance: number;
    averageBalance: number;
};

export default function UseStatistic() {
    const [isPending, startTransaction] = useTransition();
    const [statistic, setStatistic] = useState<StatisticData>();

    const fetchStatistic = async () => {
        startTransaction(async () => {
            const res = await api({
                url: "/api/users/statistic",
                method: "GET",
            });

            if (res?.status == "success") {
                setStatistic(res.data);
            }
        });
    };

    useEffect(() => {
        fetchStatistic();
    }, []);

    return { isPending, statistic };
}
