import React, { useEffect, useState } from "react";
import Flashcard from "./Flashcard";

const Flashdeals = ({ addToCart, products }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    if (products && products && Array.isArray(products)) {
      const discountedProducts = products.filter((product) => product.discount > 0);
      setData(discountedProducts);
    }
  },[products])

  if (!data) return;

  return (
    <>
      <section className="flash background">
        <div className="flashdeal container">
          <div className="heading">
            <i className="fa fa-bolt"></i>
            <h1>Ofertas Flash</h1>
          </div>
          <Flashcard addToCart={addToCart} data={data} />
        </div>
      </section>
    </>
  );
};

export default Flashdeals;
