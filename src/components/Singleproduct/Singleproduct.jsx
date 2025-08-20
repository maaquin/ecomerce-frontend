import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./singleproduct.css";
import { GetImageUrl } from "../utils/imageUtils";
import { useGetProduct } from "../../shared/hooks";
import { LoadingSpinner } from "../LoadingSpinner";

const Singleproduct = ({ addToCart, products }) => {
  let id = useParams();
  const { getProduct, product } = useGetProduct();

  const [data, setData] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [principal, setPrincipal] = useState(0);

  useEffect(() => {
    async function fetch() {
      await getProduct(id.id);
    }

    fetch();
  }, [])

  useEffect(() => {
    if (product) {
      setData(product.data[0])
    }
  })

  console.log(data)

  function imgsArray(imgString) {
    const array = JSON.parse(imgString);
    return array;
  }

  if (!data) {
    return <LoadingSpinner />;
  }

  return (
    <section className="single-product">
      <div className="single-img">
        <div className="principal-img">
          <GetImageUrl imgName={imgsArray(data.img)[principal]} />
        </div>
        <div className="gallery">
          {imgsArray(data.img).map((img, index) => (
            <div className="gallery-item" onClick={() => setPrincipal(index)}>
              <GetImageUrl imgName={img} key={index} />
            </div>
          ))}
        </div>
      </div>

      <div className="single-info">
        <div className="heading-prod">{data.name}</div>
        <div className="single-product-flex">
          <div className="description">
            {data.description}
          </div>
          <div className="price">
            <span className="new-price">
              Q {data.price * (1 - data.discount / 100)}
              {data.discount > 0 && <span className="single-discount">{data.discount}%</span>}
            </span>
            {data.discount > 0 && <span className="original-price">Q {data.price}</span>}
          </div>
          <div className="add-to-cart-button-and-quantity">
            <div className="quantity">
              <button
                onClick={() => { setQuantity(prev => Math.max(1, prev - 1)) }}
              >
                <i className="fa-solid fa-minus"></i>
              </button>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                className="quantity-input"
              />
              <button
                onClick={() => { setQuantity(prev => prev + 1) }}>
                <i className="fa-solid fa-plus"></i>
              </button>
            </div>

            <button
              aria-label="Add to cart"
              className="cart-add-btn"
              onClick={() => addToCart(data, quantity)}
            >
              <i className="fa-solid fa-cart-shopping"></i>
              Add To Cart
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Singleproduct;