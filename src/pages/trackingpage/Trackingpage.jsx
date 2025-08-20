import React from "react";
import Tracking from "../../components/Tracking/Tracking";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

const Trackingpage = ({ cartItems, addToCart, config, products }) => {
  return (
    <>
      <Header cartItems={cartItems}  config={config} />
      <Tracking />
      <Footer config={config} />
    </>
  );
};

export default Trackingpage;