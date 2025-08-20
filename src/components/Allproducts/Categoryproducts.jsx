import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GetImageUrl } from "../utils/imageUtils";
import { useSearchParams } from "react-router-dom";
import { useGetCategory } from '../../shared/hooks'
import "./allproducts.css";
import { LoadingSpinner } from "../LoadingSpinner";

const Categoryproducts = ({ addToCart, products }) => {
    const [searchParams] = useSearchParams();
    const [data, setData] = useState(null);
    const [filteredData, setFilteredData] = useState(null);
    const [name, setName] = useState(null);

    const categoryId = searchParams.get("category");
    const { getCategory, category } = useGetCategory();

    useEffect(() => {
        async function fetchCategory() {
            await getCategory(categoryId);
        }

        fetchCategory();
    }, [categoryId])

    useEffect(() => {
        if (products.length > 0) {
            setData(products);
        }
    }, [products])

    useEffect(() => {
        if (data && Array.isArray(data) && data.length > 0) {
            setFilteredData(
                data.filter((item) => item.categoryId == categoryId)
            );
        }

        if (category) {
            setName(category.data[0].name);
        }
    }, [data, category]);

    function imgsArray(imgString) {
        const array = JSON.parse(imgString);
        return array;
    }

    if (!data || !filteredData || !name) {
        return <LoadingSpinner />;
    } else if (filteredData.length < 0) {
        return <LoadingSpinner />;
    }



    return (
        <>
            <h1 className="page-header">{name}</h1>
            <div className="container grid3">
                {filteredData && filteredData.map((product, index) => {
                    return (
                        <div className="box" key={index}>
                            <div className="product mtop">
                                <Link to={`/all-products/${product.productId}`}>
                                    <div className="img">
                                        {product.discount > 0 &&
                                            <span className="discount">{product.discount}% Off</span>
                                        }
                                        <GetImageUrl imgName={imgsArray(product.img)[0]} />
                                    </div>
                                    <div className="product-details">
                                        <h3>{product.name}</h3>
                                        <div className="price">
                                            <h4>Q{product.price * (1 - product.discount / 100)}</h4>
                                        </div>
                                    </div>
                                </Link>
                                <button
                                    aria-label="Add to cart"
                                    onClick={() => addToCart(product)}
                                >
                                    <i className="fa fa-plus"></i>
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
};

export default Categoryproducts;