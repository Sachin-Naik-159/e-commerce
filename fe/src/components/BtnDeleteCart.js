import React from "react";
import { useDispatch } from "react-redux";
import "./css/btn.css";

function BtnDeleteCart({ data, rf }) {
  const dispatch = useDispatch();

  //Add to cart
  const deleteCart = () => {
    dispatch({ type: "DELETE_CART", payload: data });
    rf();
  };
  return (
    <div className="d-flex flex-row-reverse">
      <button
        className="button btn2 btn btn-outline-danger"
        onClick={deleteCart}
      >
        <i className="fa-regular fa-trash-can" style={{ color: "black" }}></i>
      </button>
    </div>
  );
}

export default BtnDeleteCart;
