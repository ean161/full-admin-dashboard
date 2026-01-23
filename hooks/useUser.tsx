"use client"
import { ColumnDef } from "@tanstack/react-table"
import { ReactNode, useEffect, useState, useTransition } from "react";
import { Badge } from "@/components/ui/badge";
import { BadgeMinus, Copy, MoreHorizontal } from "lucide-react";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";

type TableData = {
    id: string,
    username: string,
    balance: number
}

export default function useUser() {
    const router = useRouter();

    const cols: ColumnDef<TableData>[] = [
        {
            id: "id",
            header: "ID",
            cell: ({ row }) => row.original.id,
            enableSorting: false,
            enableHiding: false
        },
        {
            id: "username",
            header: "Username",
            cell: ({ row }) => row.original.username,
            enableSorting: false,
            enableHiding: false
        },
        {
            id: "balance",
            header: "Balance",
            cell: ({ row }) => `${row.original.balance}$`,
            enableSorting: false,
            enableHiding: false
        },
        {
            id: "actions",
            header: "Actions",
            cell: ({ row }) => "-",
            enableSorting: false,
            enableHiding: false
        },
    ];

    return { cols }
}