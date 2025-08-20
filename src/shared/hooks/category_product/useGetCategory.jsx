import { useState } from "react";
import {toast} from "react-hot-toast";
import { getCategory as request } from "../../../services";

export const useGetCategory = () => {
    const [category, setCategory] = useState();

    const getCategory = async (id) => {
        const data = await request(id)
        if(data.error){
            return toast.error(
                data.e?.response?.data ||
                'Error fetching category'
            )
        }
        setCategory(data)
    }

    return{
        category,
        isFetching: !category,
        getCategory
    }
}