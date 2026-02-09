"use client";
import {
    useReactTable,
    getCoreRowModel,
    flexRender,
    ColumnDef,
} from "@tanstack/react-table";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "../ui/button";
import { api } from "@/lib/api";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Skeleton } from "../ui/skeleton";

interface DataTableProps {
    columns: ColumnDef<any>[];
    url: string;
    pageSize?: number;
    refresh: number;
}

export default function DataTable({
    columns,
    url,
    pageSize = 10,
    refresh,
}: DataTableProps) {
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [debouncedSearch, setDebouncedSearch] = useState(search);

    const TableSkeleton = Array.from({ length: pageSize }).map((_, idx) => (
        <TableRow key={idx}>
            {Array.from({ length: columns.length }).map((_, idx2) => (
                <TableCell key={idx2} className="text-center align-middle">
                    <Skeleton className="h-8 w-1/1" />
                </TableCell>
            ))}
        </TableRow>
    ));

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(search);
        }, 500);

        return () => clearTimeout(timer);
    }, [search]);

    const fetchList = async (props: {
        search: string;
        page: number;
        limit: number;
    }) => {
        const req = await api({
            isSilent: true,
            url: `${url}${url.includes("?") ? "&" : "?"}search=${props.search ?? ""}&page=${props.page}&limit=${props.limit}`,
        });

        return {
            list: req.data.items,
            total: req.data.total,
        };
    };

    const { data, isFetching } = useQuery({
        queryKey: ["list", debouncedSearch, page, pageSize, refresh],
        queryFn: () =>
            fetchList({ search: debouncedSearch, page, limit: pageSize }),
    });

    const { list, total } = data ?? { list: [], total: 0 };
    const totalPages = Math.ceil(total / pageSize);

    const table = useReactTable({
        data: list ?? [],
        columns,
        getCoreRowModel: getCoreRowModel(),
        manualPagination: true,
        pageCount: Math.ceil(total / pageSize),
    });

    return (
        <div className="space-y-4">
            <div className="flex justify-end">
                <Input
                    placeholder="Search..."
                    value={search ?? ""}
                    onChange={(e) => setSearch(e.target.value)}
                    className="max-w-3xs"
                />
            </div>
            <Table className="w-full">
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                return (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                  header.column.columnDef
                                                      .header,
                                                  header.getContext(),
                                              )}
                                    </TableHead>
                                );
                            })}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {isFetching ? (
                        TableSkeleton
                    ) : table.getRowModel().rows.length > 0 ? (
                        table.getRowModel().rows.map((row) => (
                            <TableRow
                                key={row.id}
                                data-state={row.getIsSelected() && "selected"}
                            >
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell key={cell.id}>
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext(),
                                        )}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell
                                colSpan={columns.length}
                                className="text-center text-muted-foreground"
                            >
                                No data
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            <div className="flex items-center justify-end space-x-2 py-4">
                <div className="text-muted-foreground flex-1">
                    Page {page} / {totalPages || 1} - Total {total ?? 0} rows
                </div>
                <div className="space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setPage((p) => Math.max(1, p - 1))}
                        disabled={page === 1}
                    >
                        <ArrowLeft />
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                            setPage((p) => Math.min(totalPages, p + 1))
                        }
                        disabled={page === totalPages || totalPages === 0}
                    >
                        <ArrowRight />
                    </Button>
                </div>
            </div>
        </div>
    );
}
