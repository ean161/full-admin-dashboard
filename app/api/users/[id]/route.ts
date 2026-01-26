import { parseError } from "@/lib/parseError";
import { UserService } from "@/modules/user/user.service";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const UpdateSchema = z.object({
    id: z.string().min(1, "ID is require"),
    username: z.string().min(1, "Username is require"),
    balance: z.coerce
        .number("Balance must be a number")
        .min(0, "Balance must be greater than or equal 0")
        .optional()
        .default(0),
});

export async function PATCH(
    req: NextRequest,
    { params }: { params: { id: string } },
) {
    const { id } = await params;

    try {
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
    id: z.string().min(1, "ID is require"),
});

export async function DELETE(
    req: NextRequest,
    { params }: { params: { id: string } },
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
