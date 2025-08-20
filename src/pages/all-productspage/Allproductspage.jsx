import React from "react";
import Allproducts from "../../components/Allproducts/Allproducts";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

const Allproductspage = ({ cartItems, addToCart, config, products }) => {
  return (
    <>
      <Header cartItems={cartItems}  config={config} />
      <Allproducts addToCart={addToCart} products={products} />
      <Footer config={config} />
    </>
  );
};

export default Allproductspage;
