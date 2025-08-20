import toast from "react-hot-toast";
import { url } from "../../../services/api";

export const useUploadImg = () => {

    const uploadImg = async (formData) => {

        try {

            const response = await fetch(`${url}/img`, {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                toast.success('Upload image success');
            } else {
                const errorData = await response.json();
                toast.error(errorData.message || 'Upload image error, please try again');
            }
        } catch (error) {
            console.error('Error de red:', error);
        }
    }
    return {
        uploadImg
    }
}