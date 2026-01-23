"use client"

import AddForm from "@/components/shared/AddForm";
import DataTable from "@/components/shared/Datatable";
import useProduct from "@/hooks/useProduct";
import { useState } from "react";

export default function Product() {
    const [refreshKey, setRefreshKey] = useState(0);
    const refresh = () => {
        setRefreshKey(refreshKey + 1);
    }

    const { cols } = useProduct({
        refresh
    });

    return (
        <>
            <div className="flex items-center justify-between mb-4">
                <div className="flex flex-col gap-1">
                    <h2 className="text-2xl font-semibold tracking-tight">Product management</h2>
                    <p className="text-muted-foreground">Create, update, delete products</p>
                </div>
                <AddForm topic="product" refresh={refresh} handleUrl="/api/products" fields={[
                    {
                        id: "title",
                        title: "Title",
                        type: "text"
                    },
                    {
                        id: "price",
                        title: "Price ($)",
                        type: "number"
                    },
                    {
                        id: "quantity",
                        title: "Quantity",
                        type: "number"
                    }
                ]} />
            </div>
            <DataTable columns={cols} url="/api/products" refresh={refreshKey} />
        </>
    );
}