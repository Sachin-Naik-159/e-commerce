import React from "react";
import { useDispatch } from "react-redux";
import "./btn.css";

function BtnRemove({ data, update }) {
  const dispatch = useDispatch();

  //Remove from to cart
  const removeCart = () => {
    update(data.inCart);
    dispatch({ type: "REMOVE_CART", payload: data });
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
