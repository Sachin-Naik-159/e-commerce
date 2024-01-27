import React from "react";
import "./card.css";
import Stars from "./Stars";
import { useNavigate } from "react-router-dom";
import BtnAddCart from "./BtnAddCart";
import BtnRemove from "./BtnRemove";

function Card({ prod }) {
  const navigate = useNavigate();

  //Value for rating
  let rating = [];
  prod.rating.map((e) => {
    rating = [...rating, e.rate];
    return null;
  });

  const productPageLink = () => {
    navigate(`/product/${prod._id}`);
  };

  return (
    <>
      <div className="card">
        <img
          src={prod.image}
          className="card-img-top"
          alt={prod.name}
          onClick={productPageLink}
        />
        <div className="card-body">
          <h5 className="card-title" onClick={productPageLink}>
            {prod.name}
          </h5>
          <Stars rate={rating} />
          <p className="card-text">
            <b>₹ {prod.price}</b>
          </p>
          {prod.quantity > 0 ? (
            <BtnAddCart data={prod} />
          ) : (
            <button type="button" className="btn btn-secondary" disabled>
              Notift
            </button>
          )}
          <BtnRemove data={prod} />
        </div>
      </div>
    </>
  );
}

export default Card;
