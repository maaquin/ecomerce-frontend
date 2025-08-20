import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GetImageUrl } from "../utils/imageUtils";
import "./allproducts.css";
import { LoadingSpinner } from "../LoadingSpinner";

const Allproducts = ({ addToCart, products }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    if (products) {
      setData(products);
    }
  })

  function imgsArray(imgString) {
    const array = JSON.parse(imgString);
    return array;
  }

  if (!data) {
    return <LoadingSpinner />;
  } else if (data.length < 0) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <h1 className="page-header">Todos los productos</h1>
      <div className="container grid3">
        {data.map((product, index) => {
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

export default Allproducts;
