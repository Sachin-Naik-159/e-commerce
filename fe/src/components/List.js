import React from "react";
import BtnRemove from "./BtnRemove";
import BtnAddCart from "./BtnAddCart";
import BtnDeleteCart from "./BtnDeleteCart";
import { Card, Col, Row } from "react-bootstrap";
import "./css/list.css";

function List({ prod, rf, type, quantity }) {
  let inCart = 1;
  if (type === "Detail") {
    inCart = quantity;
  } else {
    inCart = prod.inCart;
  }
  return (
    <div className="row">
      <Card className="list">
        <Row className="mt-1 mb-1">
          <Col xs={2}>
            <Card.Img src={`${prod.image}`} style={{ width: "3rem" }} />
          </Col>
          <Col xs={4} className="pt-1">
            <div className="d-grid text-centre">
              <b>{prod.name}</b>
            </div>
          </Col>

          {type === "cart" ? (
            <Col xs={4} className="p-0 ">
              <Row className="mt-2">
                <Col xs={4} md={2}>
                  <BtnRemove data={prod} rf={rf} />
                </Col>
                <Col xs={2} md={1} className="d-grid text-start">
                  <p>{inCart}</p>
                </Col>
                <Col xs={4} md={2}>
                  <BtnAddCart data={prod} type={"Cart"} rf={rf} />
                </Col>
                <Col md={1}></Col>
                <Col md={5} className="mt-1">
                  <div className="d-grid text-center">
                    <b>₹ {prod.price}</b>
                  </div>
                </Col>
                <Col md={1}></Col>
              </Row>
            </Col>
          ) : (
            <Col xs={6} className="p-0 ">
              <Row className="mt-2">
                <Col xs={6} className="d-grid text-center">
                  <p>{inCart}</p>
                </Col>
                <Col xs={6} className="mt-1">
                  <div className="d-grid text-center">
                    <b>₹ {prod.price * inCart}</b>
                  </div>
                </Col>
              </Row>
            </Col>
          )}

          {type === "cart" ? (
            <Col xs={2}>
              <BtnDeleteCart data={prod} rf={rf} />
            </Col>
          ) : (
            <></>
          )}
        </Row>
      </Card>
    </div>
  );
}

export default List;
