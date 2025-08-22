import { useQuery } from "@tanstack/react-query";
import { fetchProductById, fetchProducts } from '../api/products';

export const useProducts = () => {
    return useQuery({
        queryKey: ['products'],
        queryFn: fetchProducts,
        staleTime: 1000*60*5  //5 mint cache
    });
};

export const useProductDetails = (id) => {
    return useQuery({
        queryKey:['product', id],
        queryFn: () => fetchProductById(id)
    })
};