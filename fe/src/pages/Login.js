import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Button, Col, Container, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const api_URL = process.env.REACT_APP_BASE_API_URL;
  const [user, setUser] = useState({ email: "", password: "" });
  let cart = useSelector((state) => {
    return state.cartReducer.cart;
  });

  const subminHandler = async (e) => {
    e.preventDefault();
    if (user.email === "" || user.password === "") {
      toast.warning("Enter Value");
    } else {
      try {
        let resp = await axios.post(`${api_URL}/auth/login`, user);
        if (resp.status === 200) {
          //Authentication header
          axios.defaults.headers.common["Authorization"] =
            "Bearer " + resp.data.result.token;

          toast.success(resp.data.message);
          localStorage.setItem("token", resp.data.result.token);
          localStorage.setItem("user", JSON.stringify(resp.data.result.user));
          dispatch({ type: "LOGIN_SUCCESS", payload: resp.data.result.user });
          if (cart.length === 0) {
            navigate("/");
          } else navigate("/cart");
        }
      } catch (err) {
        if (err.response.status === 401) {
          toast.error(err.response.data.message);
        }
      }
    }
  };

  return (
    <div className="mt-5 d-flex align-items-center rounded">
      <Container
        className="p-3 mb-5 bg-white rounded"
        style={{ width: "400px" }}
      >
        <Col className=" justify-content-center align-items-center">
          <h1 className="text-center">Login</h1>
          <Form className="mb-3 mt-5" onSubmit={subminHandler}>
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
                type="password"
                placeholder="password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
              ></Form.Control>
            </Form.Group>
            <Button type="submit" variant="dark">
              Login
            </Button>
          </Form>
          <Form.Text className="mb-5">
            Don't have an account?
            <Link to="/signup" className="mb-5">
              Create account
            </Link>
          </Form.Text>
        </Col>
      </Container>
    </div>
  );
}

export default Login;
