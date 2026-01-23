"use client"
import { ColumnDef } from "@tanstack/react-table"
import { ReactNode, useEffect, useState, useTransition } from "react";
import { Badge } from "@/components/ui/badge";
import { BadgeMinus, Copy, MoreHorizontal } from "lucide-react";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import EditForm from "@/components/feature/product/EditForm";

type TableData = {
    id: string,
    title: string,
    price: number,
    quantity: number
}

type UseProductProps = {
    refresh: () => void
}

export default function useProduct({ refresh }: UseProductProps) {
    const [isPending, startTransaction] = useTransition();
    const router = useRouter();

    const handleDelete = (id: string) => {
        startTransaction(async () => {
            const req = await api({
                url: "/api/products",
                method: "DELETE",
                body: JSON.stringify({
                    id
                })
            })

            if (req?.status == "success") {
                refresh();
            }
        });
    };

    const cols: ColumnDef<TableData>[] = [
        {
            id: "id",
            header: "ID",
            cell: ({ row }) => row.original.id,
            enableSorting: false,
            enableHiding: false
        },
        {
            id: "title",
            header: "Title",
            cell: ({ row }) => row.original.title,
            enableSorting: false,
            enableHiding: false
        },
        {
            id: "price",
            header: "Price",
            cell: ({ row }) => `${row.original.price}$`,
            enableSorting: false,
            enableHiding: false
        },
        {
            id: "quantity",
            header: "Quantity",
            cell: ({ row }) => `${row.original.quantity}`,
            enableSorting: false,
            enableHiding: false
        },
        {
            id: "actions",
            header: "Actions",
            cell: ({ row }) => (
                <div className="space-x-2">
                    <EditForm refresh={refresh} id={row.original.id} title={row.original.title} price={row.original.price} quantity={row.original.quantity} />
                    <Button onClick={() => handleDelete(row.original.id)} variant={"destructive"} disabled={isPending}>Delete</Button>
                </div>
            ),
            enableSorting: false,
            enableHiding: false
        },
    ];

    return { cols }
}