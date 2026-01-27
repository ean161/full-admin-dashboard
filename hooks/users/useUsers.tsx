"use client";
import { ColumnDef } from "@tanstack/react-table";
import { useTransition } from "react";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

type TableData = {
    id: string;
    username: string;
    balance: number;
};

type UseUserProps = {
    refresh: () => void;
};

export default function useUser({ refresh }: UseUserProps) {
    const [isPending, startTransaction] = useTransition();
    const router = useRouter();

    const handleDelete = (id: string) => {
        startTransaction(async () => {
            const req = await api({
                url: `/api/users/${id}`,
                method: "DELETE",
            });

            if (req?.status == "success") {
                refresh();
            }
        });
    };

    const cols: ColumnDef<TableData>[] = [
        {
            id: "id",
            header: "ID",
            cell: ({ row }) => {
                const id = row.original.id;
                return (
                    <Link
                        href={`/users/${id}`}
                        className="flex items-center space-x-1 text-gray-600"
                    >
                        <span>{id}</span>
                        <ExternalLink size={16} />
                    </Link>
                );
            },
            enableSorting: false,
            enableHiding: false,
        },
        {
            id: "username",
            header: "Username",
            cell: ({ row }) => row.original.username,
            enableSorting: false,
            enableHiding: false,
        },
        {
            id: "balance",
            header: "Balance",
            cell: ({ row }) => `${row.original.balance}$`,
            enableSorting: false,
            enableHiding: false,
        },
        {
            id: "actions",
            header: "Actions",
            cell: ({ row }) => {
                const id = row.original.id;
                return (
                    <div className="space-x-2 cursor-pointer">
                        <Link href={`/users/${id}`}>
                            <Button variant={"secondary"} disabled={isPending}>
                                Details
                            </Button>
                        </Link>
                        <Link href={`/users/${id}/edit`}>
                            <Button variant={"default"} disabled={isPending}>
                                Edit
                            </Button>
                        </Link>
                        <Button
                            onClick={() => handleDelete(id)}
                            variant={"destructive"}
                            disabled={isPending}
                        >
                            Delete
                        </Button>
                    </div>
                );
            },
            enableSorting: false,
            enableHiding: false,
        },
    ];

    return { cols };
}
