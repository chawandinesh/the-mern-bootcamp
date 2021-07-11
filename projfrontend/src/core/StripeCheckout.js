import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import StripeCheckoutButton from "react-stripe-checkout";
import { cartEmplty, loadCart } from "./helper/CartHelper";
import { API } from "../backend";
import { createOrder } from "./helper/orderHelper";

export const StripeCheckout = ({
  products,
  setReload = (f) => f,
  reload = undefined,
}) => {
  const [data, setData] = useState({
    loading: false,
    success: false,
    error: "",
    address: "",
  });
  const token = isAuthenticated() && isAuthenticated().token;
  const userId = isAuthenticated() && isAuthenticated().user._id;

  const getFinalPrice = () => {
    console.log("products", products);
    return products.reduce((acc, cv) => acc + cv.price, 0);
  };

  const makePayment = (token) => {
    const body = {
      token,
      products,
    };
    const headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };

    return fetch(`${API}/stripePayment`, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    })
      .then((response) => {
        console.log(response);
        const { status } = response;
        console.log("STATUS ", status);
        cartEmplty();
        //call further methods...
      })
      .catch((err) => console.log(err));
  };

  const showStripeButton = () => {
    return isAuthenticated() ? (
      <StripeCheckoutButton
        stripeKey="pk_test_51INuZpHlpQ81hZQcvrmmKBTlXBuqiuvnsc4ascsvwIJ0KcaDTaYe2HqloWJiGEZB10rUwESG5kfEiMOJKv7mLVrT00AcOEF83t"
        token={makePayment}
        amount={getFinalPrice()}
        name="Buy Tshirts"
        shippingAddress
        billingAddress
      >
        <button className="btn btn-success">Pay with stripe</button>
      </StripeCheckoutButton>
    ) : (
      <Link to="/signin">
        <button className="btn btn-warning">Signin</button>
      </Link>
    );
  };
  return (
    <div>
      <h3 className="text-white">Stripe checkout loaded {getFinalPrice()}</h3>
      {showStripeButton()}
    </div>
  );
};
