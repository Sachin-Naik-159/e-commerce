import React from "react";
import { useDispatch } from "react-redux";

function BtnDeleteCart({ data, update }) {
  const dispatch = useDispatch();

  //Add to cart
  const deleteCart = () => {
    update(false);
    dispatch({ type: "DELETE_CART", payload: data });
  };
  return (
    <div>
      <button className="btn btn-danger" onClick={deleteCart}>
        <i
          className="fa-regular fa-trash-can fa-xs"
          style={{ color: "black" }}
        ></i>
      </button>
    </div>
  );
}

export default BtnDeleteCart;
