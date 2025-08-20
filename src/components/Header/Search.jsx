import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GetLogoUrl } from "../utils/imageUtils";
import Navbar from "./Navbar";


const Search = ({ cartItems, config }) => {
  const [logo, setLogo] = useState();

  useEffect(() => {
    if (config && config) {
      setLogo(config.imgLogo || '')
    }
  }, [config]);

  return (
    <>
      <section className="search">
        <div className="container search-container">
          <div className="logo width">
            <Link to="/">
              {logo !== 'logo' ? (
                <GetLogoUrl imgName={logo} />
              ) : (
                <img src="/assets/logo.png" alt="Logo" />
              )}
            </Link>
          </div>

          <Navbar />

          <div className="icon f_flex width">
            <div className="cart">
              <Link to="/cart">
                <i className="fa-solid fa-cart-shopping icon-circle"></i>
                <span>{cartItems.length === 0 ? 0 : cartItems.length}</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Search;
