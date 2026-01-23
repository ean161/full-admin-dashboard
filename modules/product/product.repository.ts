import { db } from "@/db"
import { products } from "@/db/schema"
import { GetDataTableProps } from "./product.service";
import { asc, desc, eq, ilike, or, sql } from "drizzle-orm";
import { Product } from "./product.types";

export const ProductRepository = {
    async findProductByTitle(data: Pick<Product, "title">) {
        const [product] = await db.select()
            .from(products)
            .where(ilike(products.title, data.title ?? ""));
        return product;
    },

    async findWithPagingAndSearch(data: GetDataTableProps) {
        const offset = (data.page - 1) * data.limit;
        const where = data.search
            ? or(
                sql`${products.id}::text ilike ${`%${data.search}%`}`,
                ilike(products.title, `%${data.search}%`)
            )
            : undefined;

        const [items, totalResult] = await Promise.all([
            db.select()
                .from(products)
                .where(where)
                .limit(data.limit)
                .offset(offset)
                .orderBy(asc(products.title)),
            db.select({ count: sql<number>`count(*)` })
                .from(products)
                .where(where)
        ]);

        return { items, totalResult };
    },

    async insertProductWithTitleAndPriceAndQuantity(data: Pick<Product, "title" | "price" | "quantity">) {
        const product = await this.findProductByTitle({
            title: data.title
        });

        if (product) {
            throw new Error("Title duplicated");
        }

        await db.insert(products)
            .values(data)
            .execute();
    },

    async deleteProductById(data: Pick<Product, "id">) {
        await db.delete(products)
            .where(eq(products.id, data.id))
            .execute();
    },

    async updateProductById(data: Pick<Product, "id" | "title" | "price" | "quantity">) {
        await db.update(products)
            .set({
                title: data.title,
                price: data.price ?? 0,
                quantity: data.quantity ?? 0
            })
            .where(sql`${products.id}::text ilike ${`%${data.id}%`}`)
            .execute();
    }
}