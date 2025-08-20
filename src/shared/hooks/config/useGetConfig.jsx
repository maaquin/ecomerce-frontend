import { useState } from "react"
import toast from "react-hot-toast"
import {  getConfig as request} from "../../../services"

export const useGetConfig = () => {
    const [ config, setConfig ] = useState([]);

    const getConfig = async (isLogged = false) => {
        try {
            const data = await request();
            if (data.error) {
                return toast.error(
                    data.e?.response?.data || 'Error ocurred when reading config'
                );
            }

            setConfig(data.data)
        } catch (error) {
            console.error('Error fetching config:', error);
        }
    };

    return {
        getConfig,
        isFetching: !Boolean(config),
        config
    };
};