import React, { useEffect, useReducer } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import List from "./List";

function Cart() {
  const navigate = useNavigate();
  let cart = useSelector((state) => {
    return state.cartReducer.cart;
  });

  //Forced Re-render
  const [reducer, forceUpdate] = useReducer((x) => x + 1, 0);
  function refresh() {
    forceUpdate();
  }

  let inCart = () => {
    var total = 0;
    for (var i = 0; i < cart.length; i++) {
      total = total + cart[i].inCart;
    }
    return total;
  };

  let subTotal = () => {
    var total = 0;
    for (var i = 0; i < cart.length; i++) {
      total = total + cart[i].inCart * cart[i].price;
    }
    return total;
  };

  let checkOut = () => {
    // console.log(localStorage.getItem("token") === null);
    if (cart.length === 0) {
      toast.warning("Empty Cart");
    } else {
      if (localStorage.getItem("token") === null) {
        navigate("/login");
      } else {
        navigate("/address");
      }
    }
  };

  useEffect(() => {
    // eslint-disable-next-line
  }, [reducer]);

  return (
    <div>
      <h1 className="mt-2 mb-4 mx-5">Shopping Cart</h1>
      <Row>
        <Col xs={12} md={8}>
          {cart.map((e, i) => (
            <List prod={e} key={i} rf={refresh} />
          ))}
          {cart.length === 0 ? (
            <div className="d-grid text-center">
              <h2>Empty Cart</h2>
            </div>
          ) : (
            <></>
          )}
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>
                SubTotal ({inCart()} items): ₹ {subTotal()}
              </Card.Title>
            </Card.Body>
            <Card.Footer className="text-center">
              <Button variant="warning" onClick={checkOut}>
                Proceed to Checkout
              </Button>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Cart;
