import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { ToastContainer, Zoom } from "react-toastify";
import { Route, BrowserRouter, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Cart from "./components/Cart";
import Product from "./pages/Product";
import Header from "./components/common/Header";
import ShippingAddress from "./pages/ShippingAddress";
import Profile from "./pages/Profile";
import UserList from "./pages/UserList";
import CreateProduct from "./pages/CreateProduct";
import ProdAdminList from "./pages/ProdAdminList";
import EditProduct from "./pages/EditProduct";

function App() {
  function DynamicRouting() {
    const dispatch = useDispatch();

    useEffect(() => {
      const userData = JSON.parse(localStorage.getItem("user"));
      dispatch({ type: "REFRESH_CART" });
      if (userData) {
        //Authentication
        axios.defaults.headers.common["Authorization"] =
          "Bearer " + localStorage.getItem("token");

        //when user has a login active session
        dispatch({ type: "LOGIN_SUCCESS", payload: userData });
      } else {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        dispatch({ type: "LOGIN_ERROR" });
      }
      // eslint-disable-next-line
    }, []);

    return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/userlist" element={<UserList />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/address" element={<ShippingAddress />} />
        <Route path="/createproduct" element={<CreateProduct />} />
        <Route path="/prodadminlist" element={<ProdAdminList />} />
        <Route path="/editproduct/:id" element={<EditProduct />} />
      </Routes>
    );
  }
  return (
    <BrowserRouter>
      <ToastContainer
        position="bottom-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={true}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
        theme="light"
        transition={Zoom}
      />
      <div className="app">
        <Header />
        <DynamicRouting />
      </div>
    </BrowserRouter>
  );
}

export default App;
