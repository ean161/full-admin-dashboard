import { parseError } from "@/lib/parseError";
import { UserService } from "@/modules/user/user.service";
import { NextResponse } from "next/server";
import { z } from "zod"

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

const CreateSchema = z.object({
    username: z.string().min(1, "Username is require"),
    balance: z.coerce.number("Balance must be a number").min(0, "Balance must be greater than or equal 0").optional().default(0)
});

export async function POST(req: Request) {
    try {
        const payload = await req.json();
        const data = CreateSchema.parse(payload);
        await UserService.create(data);

        return NextResponse.json({
            status: "success",
            message: "User added successfully"
        });
    } catch (err: any) {
        return NextResponse.json({
            status: "error",
            message: parseError(err)
        });
    }
}

const DeleteSchema = z.object({
    id: z.string().min(1, "ID is require"),
});

export async function DELETE(req: Request) {
    try {
        const payload = await req.json();
        const data = DeleteSchema.parse(payload);
        await UserService.delete(data);

        return NextResponse.json({
            status: "success",
            message: "User deleted successfully"
        });
    } catch (err: any) {
        return NextResponse.json({
            status: "error",
            message: parseError(err)
        });
    }
}

const UpdateSchema = z.object({
    id: z.string().min(1, "ID is require"),
    username: z.string().min(1, "Username is require"),
    balance: z.coerce.number("Balance must be a number").min(0, "Balance must be greater than or equal 0").optional().default(0)
});

export async function PATCH(req: Request) {
    try {
        const payload = await req.json();
        const data = UpdateSchema.parse(payload);
        await UserService.update(data);

        return NextResponse.json({
            status: "success",
            message: "User updated successfully"
        });
    } catch (err: any) {
        return NextResponse.json({
            status: "error",
            message: parseError(err)
        });
    }
}