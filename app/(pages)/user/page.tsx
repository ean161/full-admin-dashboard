"use client"

import DataTable from "@/components/shared/Datatable";
import useUser from "@/hooks/useUser";
import { useState } from "react";

export default function User() {
    const [refreshKey, setRefreshKey] = useState(0);
    const { cols } = useUser();

    return (
        <>
            <div className="flex items-center justify-between">
                <div className="flex flex-col gap-1">
                    <h2 className="text-2xl font-semibold tracking-tight">User management</h2>
                    <p className="text-muted-foreground">Create, update, delete users</p>
                </div>
            </div>
            <DataTable columns={cols} url="/api/users" refresh={refreshKey} />
        </>
    );
}