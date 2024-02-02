import React, { useState } from "react";
import { Button, Col, Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

function ShippingAddress() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    address: "",
    city: "",
    state: "",
    postalcode: "",
    country: "",
  });

  const subminHandler = async (e) => {
    e.preventDefault();
    if (
      user.name === "" ||
      user.address === "" ||
      user.city === "" ||
      user.state === "" ||
      user.postalcode === "" ||
      user.country === ""
    ) {
      toast.warning("Please fill form");
    } else {
      let address = `${user.address}, ${user.city}, ${user.state}, ${user.country}-${user.postalcode}`;
      dispatch({
        type: "ADDRESS_UPDATE",
        payload: { address, name: user.name },
      });
      navigate("/paymentmethod");
    }
  };

  return (
    <div className="d-flex align-items-center rounded mt-5">
      <Container
        className="p-3 mb-5 bg-white rounded"
        style={{ width: "400px" }}
      >
        <Col className=" justify-content-center align-items-center">
          <h1 className="text-center">Shipping Address</h1>
          <Form className="mb-3 mt-5" onSubmit={subminHandler}>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Full Name"
                value={user.name}
                onChange={(e) => setUser({ ...user, name: e.target.value })}
              ></Form.Control>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Address"
                value={user.address}
                onChange={(e) => setUser({ ...user, address: e.target.value })}
              ></Form.Control>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="City"
                value={user.city}
                onChange={(e) => setUser({ ...user, city: e.target.value })}
              ></Form.Control>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="State"
                value={user.state}
                onChange={(e) => setUser({ ...user, state: e.target.value })}
              ></Form.Control>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="number"
                placeholder="Postal Code"
                value={user.postalcode}
                onChange={(e) =>
                  setUser({ ...user, postalcode: e.target.value })
                }
              ></Form.Control>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Country"
                value={user.country}
                onChange={(e) => setUser({ ...user, country: e.target.value })}
              ></Form.Control>
              <Form.Text>Choose Location On Map</Form.Text>
            </Form.Group>
            <Button type="submit" variant="dark">
              Continue
            </Button>
          </Form>
        </Col>
      </Container>
    </div>
  );
}

export default ShippingAddress;
