import { UserService } from "@/modules/user/user.service";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search") ?? "";
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");

    return NextResponse.json({
        status: "success",
        data: await UserService.getDatatable({
            search,
            page,
            limit
        })
    });
}