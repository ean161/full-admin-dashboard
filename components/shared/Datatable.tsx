"use client";;
import {
    useReactTable,
    getCoreRowModel,
    flexRender,
    ColumnDef,
} from "@tanstack/react-table"
import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "../ui/button"
import { api } from "@/lib/api"
import { ArrowLeft, ArrowRight } from "lucide-react";

interface DataTableProps {
    columns: ColumnDef<any>[],
    url: string,
    pageSize?: number,
    refresh: number
}

export default function DataTable({ columns, url, pageSize = 10, refresh }: DataTableProps) {
    const [list, setList] = useState<any[]>();
    const [search, setSearch] = useState("");
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [debouncedSearch, setDebouncedSearch] = useState(search);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(search);
        }, 500);

        return () => clearTimeout(timer);
    }, [search]);

    const table = useReactTable({
        data: list ?? [],
        columns,
        getCoreRowModel: getCoreRowModel(),
        manualPagination: true,
        pageCount: Math.ceil(total / pageSize),
    });

    const fetchList = async (search?: string) => {
        const req = await api({
            isSilent: true,
            url: `${url}${url.includes("?") ? "&" : "?"}search=${search ?? ""}&page=${page}&limit=${pageSize}`
        });

        if (!req?.data) {
            setList([]);
            return;
        }

        setList(req.data.items);
        setTotal(req.data.total);
    }

    useEffect(() => {
        setList(undefined);
        fetchList(debouncedSearch);
    }, [debouncedSearch, page, refresh]);

    const totalPages = Math.ceil(total / pageSize);

    return (
        <div className="w-full space-y-4">
            <div className="flex justify-end">
                <Input
                    placeholder="Tìm kiếm"
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
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                    </TableHead>
                                );
                            })}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {list !== undefined && table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => (
                            <TableRow
                                key={row.id}
                                data-state={row.getIsSelected() && "selected"}>
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell key={cell.id}>
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext()
                                        )}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell
                                colSpan={columns.length}
                                className="text-center align-middle">
                                {list === undefined ? "Đang tải" : "Không có dữ liệu"}
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            <div className="flex items-center justify-end space-x-2 py-4">
                <div className="text-muted-foreground flex-1">
                    Trang {page} / {totalPages || 1} - Tổng {total ?? 0} dòng
                </div>
                <div className="space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setPage(p => Math.max(1, p - 1))}
                        disabled={page === 1}>
                        <ArrowLeft />
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                        disabled={page === totalPages || totalPages === 0}>
                        <ArrowRight />
                    </Button>
                </div>
            </div>
        </div>
    );
}