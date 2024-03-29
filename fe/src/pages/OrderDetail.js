import React, { useEffect, useState } from "react";
import { Alert, Card, Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import axios from "axios";

import PayButton from "../components/PayButton";
import List from "../components/List";
import PayBtnStripe from "../components/PayBtnStripe";

function OrderDetail() {
  const api_URL = process.env.REACT_APP_BASE_API_URL;
  const id = window.location.pathname.split("/")[2];
  let user = useSelector((state) => {
    return state.userReducer.user;
  });
  const [order, setOrder] = useState({
    _id: "",
    custId: "",
    amount: 0,
    pay_method: "",
    deal_status: "",
    name: "",
    address: "",
    products: [],
  });
  const [total, setTotal] = useState(0);

  //Get order by id
  const getOrder = async () => {
    try {
      let resp = await axios.get(`${api_URL}/user/getorder/${id}`);
      if (resp.status === 200) {
        setOrder(resp.data);
        console.log(resp.data);
        let prod = resp.data.products;
        let sum = 0;
        for (var i = 0; i < prod.length; i++) {
          sum = sum + prod[i].quantity * prod[i].productId.price;
        }
        setTotal(sum);
      }
    } catch (err) {}
  };

  useEffect(() => {
    getOrder();

    // eslint-disable-next-line
  }, []);
  return (
    <div className="d-grid text-center mt-3">
      <h2>Order Details</h2>
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
                  {order.name}
                </Card.Text>
                <Card.Text>
                  <b>Address: </b>
                  {order.address}
                </Card.Text>
                <Alert className="mt-3" variant={"danger"}>
                  Not Delivered
                </Alert>
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
                  {order.pay_method}
                </Card.Text>
                {order.deal_status === "Not Paid" ? (
                  <Alert className="mt-3" variant={"danger"}>
                    Not Payed
                  </Alert>
                ) : (
                  <Alert className="mt-3" variant={"success"}>
                    Payed
                  </Alert>
                )}
              </Card.Body>
            </Card>
          </Row>
          <Row>
            <Card className="list">
              <Card.Body className="text-start">
                <Card.Title className="text-center">
                  <b>List</b>
                </Card.Title>
                {order.products.map((e, i) => (
                  <List
                    prod={e.productId}
                    key={i}
                    type={"Detail"}
                    quantity={e.quantity}
                  />
                ))}
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
                <b>Items :</b> ₹ {total}
              </Card.Text>
              <hr />
              <Card.Text className="mt-3">
                <b>Shipping :</b> ₹ 0
              </Card.Text>
              <hr />
              <Card.Text>
                {order.pay_method === "Stripe" ? (
                  <>
                    <b>Order Total :</b> ₹ {total}
                  </>
                ) : (
                  <>
                    <b>Order Total :</b> $ {(order.amount / 80).toFixed(2)}
                  </>
                )}
              </Card.Text>
            </Card.Body>
            {order.custId === user._id && order.deal_status === "Not Paid" ? (
              <Card.Footer className="text-center">
                {order.pay_method === "Stripe" ? (
                  <PayBtnStripe orderDetail={{ order }} />
                ) : (
                  <PayButton
                    orderDetail={{
                      order_id: id,
                      amount: (order.amount / 80).toFixed(2),
                    }}
                  />
                )}
              </Card.Footer>
            ) : (
              <></>
            )}
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default OrderDetail;
