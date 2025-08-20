import React from 'react';
import Cart from '../../components/Cart/Cart';
import Header from '../../components/Header/Header';
import Footer from "../../components/Footer/Footer";

const Cartpage = ({ productItems, cartItems, addToCart, deleteFromCart, shopItems, checkOut ,removeFromCart, config }) => {
  return (
    <>
      <Header productItems={productItems} cartItems={cartItems} config={config} />
      <Cart cartItems={cartItems} addToCart={addToCart} deleteFromCart={deleteFromCart} shopItems={shopItems} checkOut={checkOut} removeFromCart ={removeFromCart} />
      <Footer config={config} />
    </>
  )
}

export default Cartpage;