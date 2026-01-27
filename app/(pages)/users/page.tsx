"use client";
import DataTable from "@/components/shared/Datatable";
import { Button } from "@/components/ui/button";
import useUser from "@/hooks/users/useUsers";
import { Plus } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function User() {
    const [refreshKey, setRefreshKey] = useState(0);
    const refresh = () => {
        setRefreshKey(refreshKey + 1);
    };

    const { cols } = useUser({
        refresh,
    });

    return (
        <>
            <div className="flex items-center justify-between mb-4">
                <div className="flex flex-col gap-1">
                    <h2 className="text-2xl font-semibold tracking-tight">
                        User management
                    </h2>
                    <p className="text-muted-foreground">
                        Create, update, delete users
                    </p>
                </div>
                <Link href="/users/create">
                    <Button>
                        <Plus />
                        <span>Create</span>
                    </Button>
                </Link>
            </div>
            <DataTable columns={cols} url="/api/users" refresh={refreshKey} />
        </>
    );
}
