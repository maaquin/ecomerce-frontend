import { url } from "../../services";

export const BASE_URL = `${url}/img/uploads/`;

export const GetImageUrl = ({ imgName }) => {
    return (
        <img
            src={imgName}
            alt={imgName}
            fetchpriority="high"
        />
    )
};

export const GetLogoUrl = ({ imgName }) => {
    return (
        <img
            src={imgName}
            alt={imgName}
        />
    )
};