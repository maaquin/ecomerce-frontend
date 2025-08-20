import { Route, Routes } from "react-router-dom";

import Cartpage from "../../pages/cartpage/Cartpage";
import Homepage from "../../pages/homepage/Homepage";
import Loginpage from "../../pages/loginpage/Loginpage";
import Registrationpage from "../../pages/registrationpage/Registrationpage";
import Allproductspage from "../../pages/all-productspage/Allproductspage";
import Categoryproductspage from "../../pages/category-productspage/Categoryproductspage";
import Singleproductpage from "../../pages/product-details/Singleproductpage";
import ClientDataPage from "../../pages/client-data/ClientDataPage";
import ErrorNotFound from "../../components/ErrorNotFoundPage/ErrorNotFound";
import Trackingpage from "../../pages/trackingpage/Trackingpage";
import ScrollToTop from "../../components/ScrollToTop";

import "../../App.css";

export const Content = ({ categorys, config, products, setMod, cartItems,
    addToCart, deleteFromCart, checkOut, removeFromCart, }) => {

    return (
        <>
            <ScrollToTop />
            <Routes>
                <Route path="/" element={<Homepage cartItems={cartItems} addToCart={addToCart} config={config} categorys={categorys} products={products} />} />
                <Route path="/cart" element={<Cartpage cartItems={cartItems} addToCart={addToCart} deleteFromCart={deleteFromCart} checkOut={checkOut} removeFromCart={removeFromCart} config={config} />} />
                <Route path="/data-client" element={<ClientDataPage cartItems={cartItems} addToCart={addToCart} deleteFromCart={deleteFromCart} checkOut={checkOut} removeFromCart={removeFromCart} config={config} />} />
                {/*
                    <Route path="/login" element={<Loginpage cartItems={cartItems} />} />
                    <Route path="/registration" element={<Registrationpage cartItems={cartItems} />} />
                */}
                <Route path="/all-products" element={<Allproductspage cartItems={cartItems} addToCart={addToCart} config={config} products={products} />} />
                <Route path="/category-products" element={<Categoryproductspage cartItems={cartItems} addToCart={addToCart} config={config} products={products} />} />
                <Route path="/all-products/:id" element={<Singleproductpage config={config} cartItems={cartItems} products={products} addToCart={addToCart} />} />
                <Route path="/tracking-page" element={<Trackingpage cartItems={cartItems} addToCart={addToCart} config={config} products={products} />} />

                <Route path="*" element={<ErrorNotFound cartItems={cartItems} config={config} />} />
            </Routes>
        </>
    )
}   