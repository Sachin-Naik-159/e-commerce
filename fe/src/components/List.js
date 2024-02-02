import React from "react";
import BtnRemove from "./BtnRemove";
import BtnAddCart from "./BtnAddCart";
import BtnDeleteCart from "./BtnDeleteCart";
import { Card, Col, Row } from "react-bootstrap";
import "./css/list.css";

function List({ prod, rf }) {
  return (
    <div className="row">
      <Card className="list">
        <Row className="mt-1 mb-1">
          <Col xs={2}>
            <Card.Img src={`${prod.image}`} style={{ width: "3rem" }} />
          </Col>
          <Col xs={4} className="pt-1">
            <div className="d-grid text-center">
              <b>{prod.name}</b>
            </div>
          </Col>
          <Col xs={4} className="p-0 ">
            <Row className="mt-2">
              <Col xs={4} md={2}>
                <BtnRemove data={prod} rf={rf} />
              </Col>
              <Col xs={2} md={1} className="d-grid text-start">
                <p>{prod.inCart}</p>
              </Col>
              <Col xs={4} md={2}>
                <BtnAddCart data={prod} type={"Cart"} rf={rf} />
              </Col>
              <Col md={1}></Col>
              <Col md={5} className="mt-2">
                <div className="d-grid text-center">
                  <b>₹ {prod.price}</b>
                </div>
              </Col>
              <Col md={1}></Col>
            </Row>
          </Col>

          <Col xs={2}>
            <BtnDeleteCart data={prod} rf={rf} />
          </Col>
        </Row>
      </Card>
    </div>
  );
}

export default List;
