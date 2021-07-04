import React from "react";
import "../styles.css";
import Base from "./Base";
export default function Home() {
  return (
    <Base title="Home Page" description="Welcome to the Tshirt store">
      <div className="row">
        <div className="col-4">
          <button className="btn-success">Test</button>
        </div>
        <div className="col-4">
          <button className="btn-success">Test</button>
        </div>
        <div className="col-4">
          <button className="btn-success">Test</button>
        </div>
      </div>
    </Base>
  );
}
