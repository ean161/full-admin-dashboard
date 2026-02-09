import { parseError } from "@/lib/parseError";
import { UserService } from "@/modules/users/user.service";
import { EditUserSchema } from "@/modules/users/user.types";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const GetSchema = z.object({
    id: z.string().min(1, "ID is require").uuid("Invalid user id"),
});

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> },
) {
    try {
        const payload = await params;
        const data = GetSchema.parse(payload);
        const details = await UserService.details(data);

        return NextResponse.json({
            status: "success",
            data: details,
        });
    } catch (err: any) {
        return NextResponse.json({
            status: "error",
            message: parseError(err),
        });
    }
}

export async function PATCH(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> },
) {
    try {
        const { id } = await params;
        const payload = await req.json();
        payload.id = id;

        const data = EditUserSchema.parse(payload);
        const res = await UserService.update(data);

        return NextResponse.json({
            status: "success",
            message: "User " + res[0].username + " updated successfully",
        });
    } catch (err: any) {
        return NextResponse.json({
            status: "error",
            message: parseError(err),
        });
    }
}

const DeleteSchema = z.object({
    id: z.string().min(1, "ID is require").uuid("Invalid user id"),
});

export async function DELETE(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> },
) {
    try {
        const payload = await params;
        const data = DeleteSchema.parse(payload);
        const res = await UserService.delete(data);

        return NextResponse.json({
            status: "success",
            message: "User " + res[0].username + " deleted successfully",
        });
    } catch (err: any) {
        return NextResponse.json({
            status: "error",
            message: parseError(err),
        });
    }
}
