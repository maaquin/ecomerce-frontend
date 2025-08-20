import { useState } from "react";
import { toast } from "react-hot-toast";
import { getProduct as request } from "../../../services";

export const useGetProduct = () => {
    const [product, setProduct] = useState();

    const getProduct = async (id) => {
        const data = await request(id);
        if (data.error) {
            toast.error(data.e?.response?.data || 'Error fetching product');
            return null;
        }
        setProduct(data);
        return data;
    };

    return {
        product,
        isFetching: !product,
        getProduct
    }
}