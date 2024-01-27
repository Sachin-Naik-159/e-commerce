import axios from "axios";
import React, { useState } from "react";
import { Button, Col, Container, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Signup() {
  const navigate = useNavigate();
  const api_URL = process.env.REACT_APP_BASE_API_URL;
  const [user, setUser] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
  });
  const subminHandler = async (e) => {
    e.preventDefault();
    let resp = await axios.post(`${api_URL}/auth/register`, user);
    if (resp.status === 201) {
      toast.success(resp.data.message);
      setUser({ name: "", email: "", username: "", password: "" });
      navigate("/login");
    } else {
      toast.error(resp.data.message);
    }
  };
  return (
    <div className="d-flex align-items-center rounded mt-5">
      <Container
        className="p-3 mb-5 bg-white rounded"
        style={{ width: "400px" }}
      >
        <Col className=" justify-content-center align-items-center">
          <h1 className="text-center">SignUp</h1>
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
                type="email"
                placeholder="email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
              ></Form.Control>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="username"
                value={user.username}
                onChange={(e) => setUser({ ...user, username: e.target.value })}
              ></Form.Control>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="password"
                placeholder="password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
              ></Form.Control>
            </Form.Group>
            <Button type="submit" variant="dark">
              Sign Up
            </Button>
          </Form>
          <Form.Text className="mb-3">
            Already Registered?
            <Link to="/login">Login </Link>
          </Form.Text>
        </Col>
      </Container>
    </div>
  );
}

export default Signup;
