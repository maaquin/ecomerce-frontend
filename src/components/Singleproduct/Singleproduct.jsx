import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./singleproduct.css";
import { GetImageUrl } from "../utils/imageUtils";

const Singleproduct = ({ addToCart, products }) => {
  let id = useParams();

  const [data, setData] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [principal, setPrincipal] = useState(0);

  useEffect(() => {
    if (products) {
      setData(products);
    }
  }, [products])

  function imgsArray(imgString) {
    const array = JSON.parse(imgString);
    return array;
  }

  if (!data) {
    return;
  }

  return (
    <>
      {data.map((product, index) => {
        if (product.productId == id.id) {
          return (
            <div key={index}>
              <section className="single-product">
                <div className="single-img">
                  <div className="principal-img">
                    <GetImageUrl imgName={imgsArray(product.img)[principal]} />
                  </div>
                  <div className="gallery">
                    {imgsArray(product.img).map((img, index) => (
                      <div className="gallery-item" onClick={() => setPrincipal(index)}>
                        <GetImageUrl imgName={img} key={index} />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="single-info">
                  <div className="heading-prod">{product.name}</div>
                  <div className="single-product-flex">
                    <div className="description">
                      {product.description}
                    </div>
                    <div className="price">
                      <span className="new-price">
                        Q {product.price * (1 - product.discount / 100)}
                        {product.discount > 0 && <span className="single-discount">{product.discount}%</span>}
                      </span>
                      {product.discount > 0 && <span className="original-price">Q {product.price}</span>}
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
                        onClick={() => addToCart(product, quantity)}
                      >
                        <i className="fa-solid fa-cart-shopping"></i>
                        Add To Cart
                      </button>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          );
        }
      })}
    </>
  );
};
export default Singleproduct;
