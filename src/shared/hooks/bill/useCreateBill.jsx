import { useState } from "react";
import { createBill as request } from '../../../services'
import toast from "react-hot-toast";

export const useCreateBill = () => {
    const [isLoading, setIsLoading] = useState(false)

    const createBill = async ({address, name, email, phone, bill, comment, metodPayment, status, total, discount, tax, shipment, products, billCode}) => {
        const response = await request({
            address, 
            name, 
            email, 
            phone, 
            bill, 
            comment, 
            metodPayment, 
            status, 
            total, 
            discount, 
            tax, 
            shipment,
            products,
            billCode
        })

        setIsLoading(false)

        if (response.error) {
            return toast.error(response.e?.response?.data || 'Create bill error, please try again')
        }
    }
    return {
        createBill,
        isLoading
    }
}