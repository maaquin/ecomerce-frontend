import { GetImageUrl } from "../utils/imageUtils";
import { useNavigate } from "react-router-dom";
import "./Cart.css";

const Cart = ({
  cartItems,
  addToCart,
  deleteFromCart,
  removeFromCart
}) => {
  const totalPrice = cartItems.reduce(
    (price, item) => price + item.qty * item.price * (1- item.discount / 100),
    0
  );

  const navigate = useNavigate();
  const handleButtonClick = () => {
    navigate("/data-client");
  };

  function imgsArray(imgString) {
    const array = JSON.parse(imgString);
    return array;
  }
  return (
    <>
      <section className="cart-items">
        <div className="container cart-flex">
          <div className="cart-details">
            {/* Checking cartlength if it's 0 thn displaying No items are added in the cart */}
            {cartItems.length === 0 && (
              <h1 className="no-items product">
                Aún no hay ítems en el carrito de compras.
              </h1>
            )}
            {cartItems.map((item) => {
              // mapping through the array of data and using objects in the array to use in the page
              const productQty = item.price * (1- item.discount / 100) * item.qty;
              return (
                <div
                  className="cart-list product d_flex cart-responsive"
                  key={item.id}
                >
                  <div className="img">
                    <GetImageUrl imgName={imgsArray(item.img)[0]} />
                  </div>
                  <div className="cart-details">
                    <h3>{item.name}</h3>
                    <h4>
                      Q {item.price * (1- item.discount / 100)} x {item.qty}
                    </h4>
                    <span>Q {productQty}</span>
                  </div>
                  <div className="cart-items-function">
                    <div className="removeCart">
                      <button onClick={() => removeFromCart(item)}>
                        <i className="fa-solid fa-xmark"></i>
                      </button>
                    </div>
                    <div className="cartControl d_flex">
                      <button
                        className="inCart"
                        onClick={() => addToCart(item)}
                      >
                        <i className="fa fa-plus"></i>
                      </button>
                      <button
                        className="delCart"
                        onClick={() => deleteFromCart(item)}
                      >
                        <i className="fa fa-minus"></i>
                      </button>
                    </div>
                  </div>
                  <div className="cart-item-price"></div>
                </div>
              );
            })}
          </div>
          <div className="cart-total product-cart">
            <h2>Resumen de la compra</h2>
            <div className="d_flex" style={{ gap: '10px'}}>
              <h4>Total :</h4>
              <h3>Q {totalPrice}</h3>
            </div>
            <button className="checkout" onClick={handleButtonClick}>
              Avanzar
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Cart;
