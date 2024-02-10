import axios from "axios";
import React, { useState } from "react";
import { Button, Col, Container, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Signup() {
  const navigate = useNavigate();
  const api_URL = process.env.REACT_APP_BASE_API_URL;
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
  });
  const subminHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (
      user.email === "" ||
      user.password === "" ||
      user.username === "" ||
      user.name === ""
    ) {
      toast.warning("Enter Value");
      setLoading(false);
    } else {
      try {
        let resp = await axios.post(`${api_URL}/auth/register`, user);
        if (resp.status === 201) {
          setLoading(false);
          toast.success(resp.data.message);
          setUser({ name: "", email: "", username: "", password: "" });
          navigate("/login");
        }
        setLoading(false);
      } catch (err) {
        if (err.response.status === 500 || err.response.status === 400) {
          toast.error(err.response.data.message);
          setLoading(false);
        }
      }
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
            {loading ? (
              <div className="col-md-12 mt-3 text-center">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : (
              <Button type="submit" variant="dark">
                Sign Up
              </Button>
            )}
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
