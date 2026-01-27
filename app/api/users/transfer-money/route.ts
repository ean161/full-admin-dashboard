import { parseError } from "@/lib/parseError";
import { UserService } from "@/modules/users/user.service";
import { TransferUserMoneySchema } from "@/modules/users/user.types";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const payload = await req.json();
        const data = TransferUserMoneySchema.parse(payload);
        const userId = await UserService.transferMoney(data);

        return NextResponse.json({
            status: "success",
            message: "Money transfer successfully",
            data: userId,
        });
    } catch (err: any) {
        return NextResponse.json({
            status: "error",
            message: parseError(err),
        });
    }
}
