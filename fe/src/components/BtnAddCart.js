import React from "react";
import { useDispatch } from "react-redux";
import "./css/btn.css";

function BtnAddCart({ data, type, rf }) {
  const dispatch = useDispatch();

  //Add to cart
  const addCart = () => {
    dispatch({ type: "UPDATE_CART", payload: { ...data, inCart: 1 } });
    if (type === "Cart") {
      rf();
    }
  };
  return (
    <div>
      {type === "Cart" ? (
        <button className="button btn btn-warning" onClick={addCart}>
          <i className="fa-solid fa-plus fa-xs"></i>
        </button>
      ) : (
        <button className="btn btn-warning" onClick={addCart}>
          <i className="fa-solid fa-cart-shopping"></i>
        </button>
      )}
    </div>
  );
}

export default BtnAddCart;
