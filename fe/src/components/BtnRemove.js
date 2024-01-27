import React from "react";
import { useDispatch } from "react-redux";

function BtnRemove({ data }) {
  const dispatch = useDispatch();

  //Add to cart
  const removeCart = () => {
    dispatch({ type: "REMOVE_CART", payload: data });
  };
  return (
    <div>
      <button className="btn btn-warning" onClick={removeCart}>
        <i className="fa-regular fa-square-minus"></i>
      </button>
    </div>
  );
}

export default BtnRemove;
