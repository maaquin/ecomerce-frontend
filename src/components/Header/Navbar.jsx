import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [mobileMenu, setMobileMenu] = useState(false);

  return (
    <>
      <header className="header-container">
        <div className="menu-items">
          <div className="categories">
          </div>
          <ul
            className={
              mobileMenu ? "nav-links-MobileMenu" : "link f_flex capitalize"
            }
            onClick={() => setMobileMenu(false)}
          >
            <li>
              <Link
                aria-label="Inicio"
                className="link-hover"
                to="/">
                Inicio
              </Link>
            </li>
            <li>
              <Link
                aria-label="Todos los productos"
                className="link-hover"
                to="/all-products"
              >
                Todos los productos
              </Link>
            </li>
            <li>
              <Link
                aria-label="Rastrear pedido"
                className="link-hover"
                to="/tracking-page"
              >
                Rastrear pedido
              </Link>
            </li>
          </ul>
        </div>
      </header>
    </>
  );
};

export default Navbar;
