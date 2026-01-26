import { parseError } from "@/lib/parseError";
import { ProductService } from "@/modules/products/product.service";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search") ?? "";
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");

    return NextResponse.json({
        status: "success",
        data: await ProductService.getDatatable({
            search,
            page,
            limit,
        }),
    });
}

const CreateSchema = z.object({
    title: z.string().min(1, "Title is require"),
    price: z.coerce
        .number("Price must be a number")
        .min(0, "Price must be greater than or equal 0")
        .optional()
        .default(0),
    quantity: z.coerce
        .number("Quantity must be a number")
        .min(0, "Quantity must be greater than or equal 0")
        .optional()
        .default(0),
});

export async function POST(req: Request) {
    try {
        const payload = await req.json();
        const data = CreateSchema.parse(payload);
        await ProductService.create(data);

        return NextResponse.json({
            status: "success",
            message: "Product added successfully",
        });
    } catch (err: any) {
        return NextResponse.json({
            status: "error",
            message: parseError(err),
        });
    }
}
