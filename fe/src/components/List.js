import React, { useEffect, useState } from "react";
import BtnRemove from "./BtnRemove";
import BtnAddCart from "./BtnAddCart";
import BtnDeleteCart from "./BtnDeleteCart";

function List({ prod }) {
  const [inCart, setinCart] = useState();
  const [show, setShow] = useState(true);

  useEffect(() => {
    setinCart(prod.inCart);
    console.log(inCart);
    // eslint-disable-next-line
  }, []);
  return (
    <div className="row">
      {show ? (
        <>
          <div className="col-1">
            <BtnRemove data={prod} update={setinCart} />
          </div>
          <div className="col-2">
            {prod.name}: {prod.inCart}
          </div>
          <div className="col-1">
            <BtnAddCart data={prod} update={setinCart} type={"Cart"} />
          </div>
          <div className="col-1"></div>
          <div className="col-1">
            <BtnDeleteCart data={prod} update={setShow} />
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

export default List;
