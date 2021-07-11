import React, { useState, useEffect } from "react";
import DropIn from "braintree-web-drop-in-react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import { cartEmplty, loadCart } from "./helper/CartHelper";
import { createOrder } from "./helper/orderHelper";
import { getmeToken, processPayment } from "./helper/paymentBHelper";

const Paymentsb = ({ products, setReload = (f) => f, reload = undefined }) => {
  const initialState = {
    loading: false,
    success: false,
    error: "",
    clientToken: null,
    instance: {},
  };
  const [info, setInfo] = useState(initialState);

  const userId = isAuthenticated() && isAuthenticated().user._id;
  const token = isAuthenticated() && isAuthenticated().token;
  const getToken = (userId, token) => {
    getmeToken(userId, token).then((infoData) => {
      if (infoData.error) {
        setInfo({
          ...info,
          error: info.error,
        });
      } else {
        const clientToken = infoData.clientToken;
        setInfo({
          ...info,
          clientToken,
        });
      }
    });
  };
  const onPurchase = async () => {
    setInfo({ ...info, loading: true });

    const { nonce } = await info.instance.requestPaymentMethod();
    console.log(nonce);
    const paymentData = {
      paymentMethodNonce: nonce,
      amount: getTotalAmt(),
    };
    processPayment(userId, token, paymentData)
      .then((res) => {
        setInfo({ ...info, loading: false, success: res.success });
        const orderData = {
          products: products,
          transaction_id: res.transaction.id,
          amount: res.transaction.amount,
        };
        createOrder(userId, token, orderData);
        cartEmplty(() => {
          console.log("Did we got a crash?");
        });
        setReload(!reload);
      })
      .catch((err) => {
        console.log("PAYMENT FAIL", err);
      });
  };

  console.log(info);
  const showBraintreeDropIn = () => {
    return (
      <div>
        {info.clientToken !== null && products.length > 0 ? (
          <div>
            <DropIn
              options={{ authorization: info.clientToken }}
              onInstance={(instance) =>
                setInfo({ ...info, instance: instance })
              }
            />
            <button className="btn btn-block btn-success" onClick={onPurchase}>
              Buy
            </button>
          </div>
        ) : (
          <h3>PleaseLogin or add something to cart</h3>
        )}
      </div>
    );
  };
  useEffect(() => {
    getToken(userId, token);
  }, []);

  const getTotalAmt = () => {
    return products.reduce((acc, cv) => acc + cv.price, 0);
  };

  return (
    <div>
      <h1>Your bill is {getTotalAmt()}</h1>
      {showBraintreeDropIn()}
    </div>
  );
};

export default Paymentsb;
