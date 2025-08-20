import React from "react";
import Slider from "./Slider";
import "./Mainpage.css";

const Mainpage = ({ categorys }) => {
  return (
    <>
      <section className="main-page">
        <div className="container slider-container">
          <Slider categorys={categorys} />
        </div>
      </section>
    </>
  );
};

export default Mainpage;
