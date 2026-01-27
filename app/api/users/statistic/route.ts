import { parseError } from "@/lib/parseError";
import { UserService } from "@/modules/users/user.service";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const statistic = await UserService.statistic();

        return NextResponse.json({
            status: "success",
            data: statistic,
        });
    } catch (err: any) {
        return NextResponse.json({
            status: "error",
            message: parseError(err),
        });
    }
}
