import React from 'react';
import ClientData from '../../components/ClientData/ClientData';
import Header from '../../components/Header/Header';
import Footer from "../../components/Footer/Footer";

const ClientDataPage = ({ productItems, cartItems, addToCart, deleteFromCart, shopItems, checkOut ,removeFromCart, config }) => {
  return (
    <>
      <Header productItems={productItems} cartItems={cartItems} />
      <ClientData cartItems={cartItems} addToCart={addToCart} deleteFromCart={deleteFromCart} shopItems={shopItems} checkOut={checkOut} removeFromCart ={removeFromCart} />
      <Footer config={config} />
    </>
  )
}

export default ClientDataPage;