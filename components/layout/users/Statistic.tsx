"use client";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import UseStatistic from "@/hooks/users/useStatistic";
import { Coins, DollarSign, UsersRound } from "lucide-react";
import StatisticItem from "./StatisticItem";

export default function Statistic() {
    const { isPending, statistic } = UseStatistic();

    return (
        <Card className="border-dashed shadow-none">
            <CardHeader>
                <CardTitle>Statistic</CardTitle>
                <CardDescription>
                    Statistic about users on system
                </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6 sm:grid-cols-2">
                <StatisticItem
                    isPending={isPending}
                    icon={<UsersRound />}
                    label="Registed users"
                    value={statistic?.totalUser ?? 0}
                    unit=" users"
                />
                <StatisticItem
                    isPending={isPending}
                    icon={<DollarSign />}
                    label="Total balance"
                    value={statistic?.totalBalance ?? 0}
                    unit="$"
                />
                <StatisticItem
                    isPending={isPending}
                    icon={<Coins />}
                    label="Average balance"
                    value={statistic?.averageBalance ?? 0}
                    unit="$ per user"
                />
            </CardContent>
        </Card>
    );
}
