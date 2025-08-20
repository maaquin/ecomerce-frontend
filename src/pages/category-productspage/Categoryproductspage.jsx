import React from "react";
import Categoryproducts from "../../components/Allproducts/Categoryproducts";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

const Categoryproductspage = ({ cartItems, addToCart, config, products }) => {
  return (
    <>
      <Header cartItems={cartItems}  config={config} />
      <Categoryproducts addToCart={addToCart} products={products} />
      <Footer config={config} />
    </>
  );
};

export default Categoryproductspage;