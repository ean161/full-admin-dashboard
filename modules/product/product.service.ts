import { ProductRepository } from "./product.repository"
import { Product } from "./product.types";

export type GetDataTableProps = {
    search: string,
    page: number,
    limit: number
}

export const ProductService = {
    async getDatatable(data: GetDataTableProps) {
        return await ProductRepository.findWithPagingAndSearch(data);
    },

    async create(data: Pick<Product, "title" | "price" | "quantity">) {
        return await ProductRepository.insertProductWithTitleAndPriceAndQuantity(data);
    },

    async delete(data: Pick<Product, "id">) {
        return await ProductRepository.deleteProductById(data);
    },

    async update(data: Pick<Product, "id" | "title" | "price" | "quantity">) {
        return await ProductRepository.updateProductById(data);
    },
}