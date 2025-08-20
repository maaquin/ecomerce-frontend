import { Link } from "react-router-dom";
import Slider from "react-slick";
import { GetImageUrl } from "../utils/imageUtils";

import './flashdeals.css';

// setting up arrows to display next and previous arrows and make them work
const NextArrow = (props) => {
  const { onClick } = props;
  return (
    <div className="control-btn" onClick={onClick}>
      <button aria-label="Next slide" className="next">
        <i className="fa fa-long-arrow-alt-right"></i>
      </button>
    </div>
  );
};
const PrevArrow = (props) => {
  const { onClick } = props;
  return (
    <div className="control-btn" onClick={onClick}>
      <button aria-label="Previous slide" className="prev">
        <i className="fa fa-long-arrow-alt-left"></i>
      </button>
    </div>
  );
};

const Flashcard = ({ addToCart, data }) => {

  function imgsArray(imgString) {
    const array = JSON.parse(imgString);
    return array;
  }

  const settings = {
    dots: false,
    infinite: data.length > 1,
    speed: 800,
    slidesToShow: 5,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    arrows: data.length > 1,
    responsive: [
      {
        breakpoint: 1440,
        settings: {
          slidesToShow: 4,
          dots: true, // Show dots on smaller screens
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          dots: true, // Show dots on smaller screens
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          dots: true, // Show dots on smaller screens
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          dots: true, // Show dots on even smaller screens
        },
      },
    ],
  };
  return (
    <>
      {/* Used the react-slick-slider to make a fast and effective slider for the page */}
      <Slider {...settings}>
        {data.map((product, index) => {
          // mapping throught the array of data and using objects in the array to use in the page
          return (
            <div className="box" key={index}>
              <div className="product">
                <Link to={`/all-products/${product.productId}`}>
                  <div className="img">
                    <span className="discount">{product.discount}% Off</span>
                    <GetImageUrl imgName={imgsArray(product.img)[0]} />
                  </div>
                </Link>
                <div className="product-details">
                  <Link to={`/all-products/${product.productId}`}>
                    <h3 className="truncate">{product.name}</h3>
                  </Link>
                  <div className="price-flash-card">
                    <h4>Q {product.price * (1 - product.discount / 100)}</h4>
                    <span className="original-price">Q {product.price}</span>
                    <button
                      aria-label="Add to cart"
                      onClick={() => addToCart(product)}
                    >
                      <i className="fa fa-plus"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </Slider>
    </>
  );
};

export default Flashcard;
