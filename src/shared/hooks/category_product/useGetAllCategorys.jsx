import { useState } from "react"
import toast from "react-hot-toast"
import {  getAllCategorys as request} from "../../../services"


export const useGetAllCategorys = () => {
    const [ categorys, setCategorys ] = useState([]);

    const getAllCategorys = async (isLogged = false) => {
        try {
            const data = await request();
            if (data.error) {
                return toast.error(
                    data.e?.response?.data || 'Error ocurred when reading categorys'
                );
            }

            setCategorys(data.data)
        } catch (error) {
            console.error('Error fetching categorys:', error);
        }
    };

    return {
        getAllCategorys,
        isFetching: !Boolean(categorys),
        allCategorys: categorys
    };
};