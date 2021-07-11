import React, { useState, useEffect } from "react";
import Base from "./Base";
import Card from "./Card";
import { loadCart } from "./helper/CartHelper";
import Paymentsb from "./Paymentsb";
import { StripeCheckout } from "./StripeCheckout";

function Cart() {
  const [products, setProducts] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    console.log("calling..", loadCart());
    setProducts(loadCart());
  }, [reload]);

  const loadAllProducts = () => {
    return (
      <div>
        <h2>This section is to load products </h2>
        {products.map((product, index) => {
          return (
            <Card
              key={index}
              product={product}
              removeFromCart={true}
              addToCart={false}
              setReload={setReload}
              reload={reload}
            />
          );
        })}
      </div>
    );
  };
  const loadCheckout = () => {
    return (
      <div>
        <h2>This section is for checkout</h2>
      </div>
    );
  };
  return (
    <Base title="Cart" description="Here your cart">
      <div className="row text-center">
        <div className="col-6">
          {products && products.length > 0 ? (
            loadAllProducts()
          ) : (
            <h3>No products in cart</h3>
          )}
        </div>
        <div className="col-6">
          {products && products.length > 0 ? (
            <Paymentsb
              products={products}
              setReload={setReload}
              reload={reload}
            />
          ) : (
            <h2>Add items to the cart</h2>
          )}
        </div>
      </div>
    </Base>
  );
}

export default Cart;
