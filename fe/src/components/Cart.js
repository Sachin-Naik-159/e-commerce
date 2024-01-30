import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import List from "./List";

function Cart() {
  let cart = useSelector((state) => {
    return state.cartReducer.cart;
  });

  useEffect(() => {
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      {cart.map((e, i) => (
        <div key={i}>
          <List prod={e} />
        </div>
      ))}
    </div>
  );
}

export default Cart;
