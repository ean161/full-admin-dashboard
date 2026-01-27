import { parseError } from "@/lib/parseError";
import { UserService } from "@/modules/users/user.service";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const ReadSchema = z.object({
    id: z.string().min(1, "ID is require").uuid("Invalid user id"),
});

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> },
) {
    try {
        const payload = await params;
        const data = ReadSchema.parse(payload);
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

const UpdateSchema = z.object({
    id: z.string().min(1, "ID is require").uuid("Invalid user id"),
    username: z.string().min(1, "Username is require"),
    balance: z.coerce
        .number("Balance must be a number")
        .min(0, "Balance must be greater than or equal 0")
        .optional()
        .default(0),
});

export async function PATCH(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> },
) {
    try {
        const { id } = await params;
        const payload = await req.json();
        payload.id = id;

        const data = UpdateSchema.parse(payload);
        await UserService.update(data);

        return NextResponse.json({
            status: "success",
            message: "User updated successfully",
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
        await UserService.delete(data);

        return NextResponse.json({
            status: "success",
            message: "User deleted successfully",
        });
    } catch (err: any) {
        return NextResponse.json({
            status: "error",
            message: parseError(err),
        });
    }
}
