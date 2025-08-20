import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GetImageUrl } from "../utils/imageUtils.jsx";
import "./newArrivals.css";

const Newarrivals = ({ products }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
  if (products && products.length > 0) {
    const latestProducts = [...products]
      .sort((a, b) => new Date(b.timeStamp) - new Date(a.timeStamp))
      .slice(0, 5);

    setData(latestProducts);
  }
}, [products]);

  function imgsArray(imgString) {
    const array = JSON.parse(imgString);
    return array;
  }

  if (!data) {
    return
  }

  return (
    <>
      <section className="newarrivals background">
        <div className="container">
          <div className="heading">
            <img
              src="https://img.icons8.com/glyph-neue/64/26e07f/new.png"
              alt="new-arrivals-logo"
            />
            <h2>Novedades</h2>
          </div>
          <div className="content product-new-arrival">
            {data.map((item, index) => {
              return (
                <div className="box" key={index}>
                  <div className="img">
                    <Link to={`/all-products/${item.productId}`}>
                      <GetImageUrl imgName={imgsArray(item.img)[0]} />
                      <h4>{item.name}</h4>
                      <span>Q{item.price * (1 - item.discount / 100)}</span>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default Newarrivals;
