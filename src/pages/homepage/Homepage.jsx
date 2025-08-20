import React from "react";
import Header from "../../components/Header/Header";
import Newarrivals from "../../components/Newarrivals/Newarrivals";
import Footer from "../../components/Footer/Footer";
import Mainpage from "../../components/Mainpage/Mainpage";
import Flashdeals from "../../components/FlashDeals/Flashdeals";
import Features from "../../components/Features/Features";

const Homepage = ({ addToCart, cartItems, config, categorys, products }) => {

  const discountedProducts = products?.filter(product => product.discount > 0);

  return (
    <>
      <Header cartItems={cartItems} config={config} />
      <Mainpage categorys={categorys} />
      {discountedProducts && discountedProducts.length > 0 && (
        <Flashdeals addToCart={addToCart} products={discountedProducts} />
      )}
      <Newarrivals products={products} />
      <Features />
      <Footer config={config} />
    </>
  );
};

export default Homepage;
