import React from "react";
import Slidecard from "./Slidecard";

const Slider = ({ categorys }) => {

  return (
    <>
      <section className="slider contentWidth">
        <Slidecard data={categorys} />
      </section>
    </>
  );
};

export default Slider;
