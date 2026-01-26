import { parseError } from "@/lib/parseError";
import { ProductService } from "@/modules/products/product.service";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const UpdateSchema = z.object({
    id: z.string().min(1, "ID is require"),
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

export async function PATCH(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> },
) {
    try {
        const { id } = await params;
        const payload = await req.json();
        payload.id = id;

        const data = UpdateSchema.parse(payload);
        await ProductService.update(data);

        return NextResponse.json({
            status: "success",
            message: "Product updated successfully",
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
    { params }: { params: Promise<{ id: string }> },
) {
    try {
        const payload = await params;
        const data = DeleteSchema.parse(payload);
        await ProductService.delete(data);

        return NextResponse.json({
            status: "success",
            message: "Product deleted successfully",
        });
    } catch (err: any) {
        return NextResponse.json({
            status: "error",
            message: parseError(err),
        });
    }
}
