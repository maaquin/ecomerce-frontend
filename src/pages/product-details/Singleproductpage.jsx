import React from "react";
import Singleproduct from "../../components/Singleproduct/Singleproduct";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

const Singleproductpage = ({ cartItems, addToCart, products, config }) => {
  return (
    <>
      <Header cartItems={cartItems} />
      <Singleproduct addToCart={addToCart} products={products} />
      <Footer config={config} />
    </>
  );
};

export default Singleproductpage;
