"use client";
import Header from "@/components/layout/users/Header";
import DataTable from "@/components/shared/Datatable";
import useUser from "@/hooks/users/useUsers";
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
            <Header hasFullFeats={true} />
            <DataTable columns={cols} url="/api/users" refresh={refreshKey} />
        </>
    );
}
