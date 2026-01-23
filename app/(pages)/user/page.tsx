"use client"

import DataTable from "@/components/shared/Datatable";
import useUser from "@/hooks/useUser";
import { useState } from "react";

export default function User() {
    const [refreshKey, setRefreshKey] = useState(0);
    const { cols } = useUser();

    return (
        <DataTable columns={cols} url="/api/users" refresh={refreshKey} />
    );
}