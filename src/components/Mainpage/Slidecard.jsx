import { useNavigate } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { LoadingSpinner } from "../LoadingSpinner";
import { GetImageUrl } from "../utils/imageUtils";

const Slidecard = ({ data }) => {
  const navigate = useNavigate();

  const handleButtonClick = (category) => {
    navigate(`/category-products?category=${category}`);
  };

  const settings = {
    dots: true,
    infinite: data.length > 1,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: data.length > 1,
    arrows: data.length > 1,
    appendDots: (dots) => {
      return <ul style={{ margin: "0px" }}>{dots}</ul>;
    },
  };

  if(!data || data.length === 0) {
    return (
      <LoadingSpinner/>
    )
  }

  return (
    <>
      <Slider {...settings}>
        {data.map((value, index) => {
          return (
            <div className="box d_flex top slider-card" key={index}>
              <div className="left">
                <h1>{value.name}</h1>
                <p>{value.description}</p>
                <button
                  onClick={() => handleButtonClick(value.categoryId)}
                  className="btn-primary"
                  style={{marginTop: '20px'}}
                  aria-hidden="false"
                >
                  Ver Categoría
                </button>
              </div>
              <div className="right">
                <GetImageUrl imgName={value.img} />
              </div>
            </div>
          );
        })}
      </Slider>
    </>
  );
};

export default Slidecard;
