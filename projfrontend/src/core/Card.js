import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { addItemToCart, removeItemFromCart } from "./helper/CartHelper";
import ImageHelper from "./helper/ImageHelper";

function Card({
  product,
  addToCart = true,
  removeFromCart = false,
  reload,
  setReload = (f) => f,
}) {
  const [redirect, setRedirect] = useState(false);
  const cardTitle = product ? product.name : "A photo from pixels";
  const cardDescription = product ? product.description : "Default description";
  const cardPrice = product ? product.price : "DEFAULT";

  const addtoCart = () => {
    addItemToCart(product, () => {
      setRedirect(true);
    });
  };
  const getRedirect = () => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };
  const showAddToCart = () => {
    return (
      addToCart && (
        <button
          onClick={addtoCart}
          className="btn btn-block btn-outline-success mt-2 mb-2"
        >
          Add to Cart
        </button>
      )
    );
  };
  const showRemoveFromCart = () => {
    return (
      removeFromCart && (
        <button
          onClick={() => {
            removeItemFromCart(product._id);
            setReload((old) => !old);
          }}
          className="btn btn-block btn-outline-danger mt-2 mb-2"
        >
          Remove from cart
        </button>
      )
    );
  };
  return (
    <div className="card text-white bg-dark border border-info ">
      <div className="card-header lead">{cardTitle}</div>
      <div className="card-body">
        {getRedirect(redirect)}
        <ImageHelper product={product} />
        <p className="lead bg-success font-weight-normal text-wrap">
          {cardDescription}
        </p>
        <p className="btn btn-success rounded  btn-sm px-4">$ {cardPrice}</p>
        <div className="row">
          <div className="col-12">{showAddToCart()}</div>
          <div className="col-12">{showRemoveFromCart()}</div>
        </div>
      </div>
    </div>
  );
}

export default Card;
