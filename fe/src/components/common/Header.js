import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  Container,
  Nav,
  Navbar,
  NavDropdown,
  Form,
  Button,
} from "react-bootstrap";
import Filter from "./Filter";
import "./header.css";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");

  let cart = useSelector((state) => {
    return state.cartReducer.cart;
  });
  let inCart = () => {
    var total = 0;
    for (var i = 0; i < cart.length; i++) {
      total = total + cart[i].inCart;
    }
    return total;
  };

  let admin = false;
  let user = useSelector((state) => {
    return state.userReducer.user;
  });
  if (user) {
    admin = user.isAdmin;
  }

  const searchHandler = (e) => {
    e.preventDefault();
    // navigate(`/search?${search}`);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    dispatch({ type: "LOGIN_ERROR" });
    navigate("/");
    toast.success("Logged Out");
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary custom-bg">
      <Container className="custom-bg">
        <Filter />
        <Navbar.Brand href="/">E Commerce</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Form
            className="col-10 col-md-6 my-md-3 my-4 me-2 d-flex custom-container"
            role="search"
            onSubmit={searchHandler}
          >
            <Form.Control
              className="form-control search-input"
              type="search"
              placeholder="Search"
              aria-label="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Button
              className="btn btn-secondary search-button"
              type="submit"
              href={`/search?${search}`}
            >
              Search
            </Button>
          </Form>
          <Nav className="me-auto">
            <Nav.Link href="/cart">
              Cart
              {cart.length === 0 ? (
                <></>
              ) : (
                <sup style={{ color: "Red" }}>{inCart()}</sup>
              )}
            </Nav.Link>

            {/* User's options */}
            {localStorage.getItem("token") ? (
              <>
                <NavDropdown title={user.username} id="basic-nav-dropdown">
                  <NavDropdown.Item href="/profile">
                    User Profile
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.1">
                    Order History
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={handleLogout}>
                    Sign Out
                  </NavDropdown.Item>
                </NavDropdown>

                {/* Admin's Options */}
                {admin ? (
                  <NavDropdown title="Admin Panel" id="basic-nav-dropdown">
                    <NavDropdown.Item href="/userlist">
                      All Users
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.1">
                      All Orders
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="/createproduct">
                      Create Product
                    </NavDropdown.Item>
                    <NavDropdown.Item href="/prodadminlist">
                      Edit a Product
                    </NavDropdown.Item>
                  </NavDropdown>
                ) : (
                  <></>
                )}
              </>
            ) : (
              <Nav.Link href="/login">LogIn</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
