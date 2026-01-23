"use client"

import AddForm from "@/components/shared/AddForm";
import DataTable from "@/components/shared/Datatable";
import useUser from "@/hooks/useUser";
import { useState } from "react";

export default function User() {
    const [refreshKey, setRefreshKey] = useState(0);
    const refresh = () => {
        setRefreshKey(refreshKey + 1);
    }

    const { cols } = useUser({
        refresh
    });


    return (
        <>
            <div className="flex items-center justify-between mb-4">
                <div className="flex flex-col gap-1">
                    <h2 className="text-2xl font-semibold tracking-tight">User management</h2>
                    <p className="text-muted-foreground">Create, update, delete users</p>
                </div>
                <AddForm refresh={refresh} handleUrl="/api/users" fields={[
                    {
                        id: "username",
                        title: "Username",
                        type: "text"
                    },
                    {
                        id: "balance",
                        title: "Balance ($)",
                        type: "number"
                    }
                ]} />
            </div>
            <DataTable columns={cols} url="/api/users" refresh={refreshKey} />
        </>
    );
}