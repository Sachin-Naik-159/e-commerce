import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import List from "./List";

function Cart() {
  let cart = useSelector((state) => {
    return state.cartReducer.cart;
  });

  let count = [];
  cart.forEach((element) => {
    count[element.name] = (count[element.name] || 0) + 1;
  });

  useEffect(() => {
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      {/* {cart.map((e, index) => (
        <p key={index}>{e.name}</p>
      ))} */}
      <List prod={cart} count={count} />
    </div>
  );
}

export default Cart;
