import React from "react";
import Search from "./Search";
import "./Header.css";

const Header = ({ cartItems, config }) => {
  return (
    <>
      <Search cartItems={cartItems} config={config} />
    </>
  );
};

export default Header;