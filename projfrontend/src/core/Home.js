import React, { useState, useEffect } from "react";
import "../styles.css";
import Base from "./Base";
import Card from "./Card";
import { getAllProducts } from "./helper/coreapicalls";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);

  const loadAllProducts = () => {
    getAllProducts().then((data) => {
      if (data.error) {
        setError(true);
      } else {
        setProducts(data);
      }
    });
  };
  useEffect(() => {
    loadAllProducts();
  }, []);

  return (
    <Base title="Home Page" description="Welcome to the Tshirt store">
      <div className="row text-center">
        <h1>All of Tshirts</h1>
        <div className="row">
          {products.map((eachProduct, index) => {
            return(
              <div className="col-4 mb-4" key={index}>
                <Card product={eachProduct}/>
              </div>
            )
          })}
        </div>
        {/* <div className="col-4">
          <Card />
        </div>
        <div className="col-4">
          <button className="btn-success">Test</button>
        </div>
        <div className="col-4">
          <button className="btn-success">Test</button>
        </div> */}
      </div>
    </Base>
  );
}
