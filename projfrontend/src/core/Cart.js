import React, { useState, useEffect } from "react";
import Base from "./Base";
import Card from "./Card";
import { loadCart } from "./helper/CartHelper";

function Cart() {
  const [products, setProducts] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
      console.log('calling..', loadCart())
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
        <div className="col-6">{loadAllProducts()}</div>
        <div className="col-6">{loadCheckout()}</div>
      </div>
    </Base>
  );
}

export default Cart;
