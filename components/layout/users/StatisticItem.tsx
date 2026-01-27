import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { ReactNode } from "react";

type StatisticItemProps = {
    isPending: boolean;
    icon: ReactNode;
    label: string;
    value: number;
    unit: string;
};

export default function StatisticItem({
    isPending,
    icon,
    label,
    value,
    unit,
}: StatisticItemProps) {
    return (
        <div className="flex items-center gap-4">
            <Button variant={"secondary"}>{icon}</Button>
            <div className="flex flex-col">
                <span className="text-sm font-semibold">{label}</span>
                {isPending && <Spinner color="gray" />}
                {!isPending && (
                    <span className="text-muted-foreground text-sm">
                        <b>{value}</b>
                        {unit}
                    </span>
                )}
            </div>
        </div>
    );
}
