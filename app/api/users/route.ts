import { parseError } from "@/lib/parseError";
import { UserService } from "@/modules/users/user.service";
import { CreateUserSchema } from "@/modules/users/user.types";
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
            limit,
        }),
    });
}

export async function POST(req: Request) {
    try {
        const payload = await req.json();
        const data = CreateUserSchema.parse(payload);
        const userId = await UserService.create(data);

        return NextResponse.json({
            status: "success",
            message: "User added successfully",
            data: userId,
        });
    } catch (err: any) {
        return NextResponse.json({
            status: "error",
            message: parseError(err),
        });
    }
}
