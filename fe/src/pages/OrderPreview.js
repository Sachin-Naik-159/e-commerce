import React from "react";
import axios from "axios";
import { Button, Card, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import List from "../components/List";
import "../components/css/list.css";

function OrderPreview() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const api_URL = process.env.REACT_APP_BASE_API_URL;
  let state = useSelector((state) => {
    return state.cartReducer;
  });
  let cart = state.cart;

  let subTotal = () => {
    var total = 0;
    for (var i = 0; i < cart.length; i++) {
      total = total + cart[i].inCart * cart[i].price;
    }
    return total;
  };
  let placeOrder = async (e) => {
    e.preventDefault();
    let text = "Do you want to place on order";
    let confirmation = window.confirm(text);

    if (confirmation === true) {
      try {
        let resp = await axios.post(`${api_URL}/user/createorder`, state);
        if (resp.status === 201) {
          toast.success(resp.data.message);
          dispatch({ type: "CHECKOUT_CART" });
          navigate(`/orderdetail/${resp.data.resp._id}`);
        }
      } catch (err) {}
    }
  };

  return (
    <div className="d-grid text-center mt-3">
      <h2>Order Preview</h2>
      <Row>
        <Col xs={12} md={8}>
          <Row>
            <Card className="list">
              <Card.Body className="text-start">
                <Card.Title className="text-center">
                  <b>Shipping</b>
                </Card.Title>
                <Card.Text>
                  <b>Name: </b>
                  {state.name}
                </Card.Text>
                <Card.Text>
                  <b>Address: </b>
                  {state.address}
                </Card.Text>
                <Card.Link href="/address">Edit</Card.Link>
              </Card.Body>
            </Card>
          </Row>
          <Row>
            <Card className="list">
              <Card.Body className="text-start">
                <Card.Title className="text-center">
                  <b>Payment</b>
                </Card.Title>
                <Card.Text>
                  <b>Method: </b>
                  {state.pay}
                </Card.Text>
                <Card.Link href="/paymentmethod">Edit</Card.Link>
              </Card.Body>
            </Card>
          </Row>
          <Row>
            <Card className="list">
              <Card.Body className="text-start">
                <Card.Title className="text-center">
                  <b>List</b>
                </Card.Title>
                {cart.map((e, i) => (
                  <List prod={e} key={i} />
                ))}
                <Card.Link href="/cart">Edit</Card.Link>
              </Card.Body>
            </Card>
          </Row>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>
                <b>Order Summary</b>
              </Card.Title>
              <Card.Text className="mt-3">
                <b>Items :</b> ₹ {subTotal()}
              </Card.Text>
              <hr />
              <Card.Text className="mt-3">
                <b>Shipping :</b> ₹ 40
              </Card.Text>
              <hr />
              <Card.Text>
                <b>Order Total :</b> $ {((subTotal() + 40) / 80).toFixed(2)}
              </Card.Text>
            </Card.Body>
            <Card.Footer className="text-center">
              <Button variant="warning" onClick={placeOrder}>
                Place Order
              </Button>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default OrderPreview;
