"use client";
import Header from "@/components/layout/users/Header";
import Statistic from "@/components/layout/users/Statistic";
import DataTable from "@/components/shared/Datatable";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
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
            <div className="md:flex md:space-x-8 space-y-8">
                <div className="w-full md:w-1/5">
                    <Statistic />
                </div>
                <Card className="w-full md:w-4/5 border-dashed shadow-none">
                    <CardHeader>
                        <CardTitle>List of user</CardTitle>
                        <CardDescription>
                            All user registed on system
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <DataTable
                            columns={cols}
                            url="/api/users"
                            refresh={refreshKey}
                        />
                    </CardContent>
                </Card>
            </div>
        </>
    );
}
