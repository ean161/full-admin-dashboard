import { parseError } from "@/lib/parseError";
import { UserService } from "@/modules/users/user.service";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const list = await UserService.getList();

        return NextResponse.json({
            status: "success",
            data: list,
        });
    } catch (err: any) {
        return NextResponse.json({
            status: "error",
            message: parseError(err),
        });
    }
}
