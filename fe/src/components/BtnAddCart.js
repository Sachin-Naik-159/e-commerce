import React from "react";
import { useDispatch } from "react-redux";
// import { toast } from "react-toastify";

function BtnAddCart({ data }) {
  const dispatch = useDispatch();

  //Add to cart
  const addCart = () => {
    dispatch({ type: "UPDATE_CART", payload: data });
  };
  return (
    <div>
      <button className="btn btn-warning" onClick={addCart}>
        <i className="fa-solid fa-cart-shopping"></i>
      </button>
    </div>
  );
}

export default BtnAddCart;
