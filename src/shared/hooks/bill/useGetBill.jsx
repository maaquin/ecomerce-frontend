import { useState } from "react";
import { toast } from "react-hot-toast";
import { getBillById as request } from "../../../services";

export const useGetBill = () => {
    const [bill, setBill] = useState();

    const getBill = async (id) => {
        const data = await request(id)
        if (data.error) {
            throw new Error(data.error)
        }
        setBill(data)
    }

    return {
        bill,
        isFetching: !bill,
        getBill
    }
}