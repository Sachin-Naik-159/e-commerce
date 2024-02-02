import React from "react";
import { useDispatch } from "react-redux";
import "./css/btn.css";

function BtnRemove({ data, rf }) {
  const dispatch = useDispatch();

  //Remove from to cart
  const removeCart = () => {
    dispatch({ type: "REMOVE_CART", payload: data });
    rf();
  };
  return (
    <div>
      <button className="button btn btn-warning" onClick={removeCart}>
        <i className="fa-solid fa-minus fa-2xs"></i>
      </button>
    </div>
  );
}

export default BtnRemove;
