import axios from "axios";
import React, { useState } from "react";
import { Button, Col, Container, Form } from "react-bootstrap";
import { toast } from "react-toastify";

function Profile() {
  const api_URL = process.env.REACT_APP_BASE_API_URL;
  const [user, setUser] = useState({
    name: "",
    username: "",
    password: "",
    confirmpassword: "",
  });
  const subminHandler = async (e) => {
    e.preventDefault();
    if (
      user.name === "" &&
      user.username === "" &&
      user.password === "" &&
      user.confirmpassword === ""
    ) {
      toast.error("Enter Value");
    } else {
      if (user.password === user.confirmpassword) {
        let resp = await axios.put(`${api_URL}/user/editprofile`, user);
        if (resp.status === 200) {
          toast.success(resp.data.message);
          setUser({
            name: "",
            username: "",
            password: "",
            confirmpassword: "",
          });
        } else {
          toast.error(resp.data.message);
        }
      } else {
        toast.error("Password don't Match");
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
          <h1 className="text-center">User Profile</h1>
          <Form className="mb-3 mt-5" onSubmit={subminHandler}>
            <Form.Group className="mb-3">
              <Form.Control
                className="mb-3"
                type="text"
                placeholder="Full Name"
                value={user.name}
                onChange={(e) => setUser({ ...user, name: e.target.value })}
              ></Form.Control>

              <Form.Control
                className="mb-3"
                type="text"
                placeholder="username"
                value={user.username}
                onChange={(e) => setUser({ ...user, username: e.target.value })}
              ></Form.Control>

              <Form.Control
                className="mb-3"
                type="password"
                placeholder="password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
              ></Form.Control>

              <Form.Control
                className="mb-3"
                type="password"
                placeholder="confirmpassword"
                value={user.confirmpassword}
                onChange={(e) =>
                  setUser({ ...user, confirmpassword: e.target.value })
                }
              ></Form.Control>
            </Form.Group>
            <Button type="submit" variant="dark">
              Edit
            </Button>
          </Form>
        </Col>
      </Container>
    </div>
  );
}

export default Profile;
