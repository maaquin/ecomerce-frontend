import { useState } from "react"
import toast from "react-hot-toast"
import {  getAllProducts as request} from "../../../services"


export const useGetAllProducts = () => {
    const [ products, setProducts ] = useState([]);

    const getAllProducts = async (isLogged = false) => {
        try {
            const data = await request();
            if (data.error) {
                return toast.error(
                    data.e?.response?.data || 'Error ocurred when reading products'
                );
            }

            setProducts(data.data)
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    return {
        getAllProducts,
        isFetching: !Boolean(products),
        allProducts: products
    };
};