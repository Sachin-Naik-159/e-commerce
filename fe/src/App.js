import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { ToastContainer, Zoom } from "react-toastify";
import { Route, BrowserRouter, Routes } from "react-router-dom";

import Header from "./components/common/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Cart from "./components/Cart";
import Product from "./pages/Product";
import Profile from "./pages/Profile";
import UserList from "./pages/UserList";
import AllOrders from "./pages/AllOrders";
import EditProduct from "./pages/EditProduct";
import OrderDetail from "./pages/OrderDetail";
import OrderPreview from "./pages/OrderPreview";
import CreateProduct from "./pages/CreateProduct";
import ProdAdminList from "./pages/ProdAdminList";
import PaymentMethod from "./pages/PaymentMethod";
import ShippingAddress from "./pages/ShippingAddress";
import Success from "./pages/Success";

function App() {
  function DynamicRouting() {
    const dispatch = useDispatch();

    useEffect(() => {
      const userData = JSON.parse(localStorage.getItem("user"));
      dispatch({ type: "REFRESH_CART" });
      dispatch({ type: "REFRESH_ORDER" });
      if (userData) {
        //Authentication
        axios.defaults.headers.common["Authorization"] =
          "Bearer " + localStorage.getItem("token");

        //when user has a login active session
        dispatch({ type: "LOGIN_SUCCESS", payload: userData });
      } else {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("order");
        dispatch({ type: "LOGIN_ERROR" });
      }
      // eslint-disable-next-line
    }, []);

    return (
      <Routes>
        {/* Pament Status Pages */}
        <Route path="/paysuccess" element={<Success />} />

        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/userlist" element={<UserList />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/address" element={<ShippingAddress />} />
        <Route path="/userallorders" element={<AllOrders />} />
        <Route path="/adminallorders" element={<AllOrders />} />
        <Route path="/orderpreview" element={<OrderPreview />} />
        <Route path="/orderdetail/:id" element={<OrderDetail />} />
        <Route path="/createproduct" element={<CreateProduct />} />
        <Route path="/prodadminlist" element={<ProdAdminList />} />
        <Route path="/paymentmethod" element={<PaymentMethod />} />
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
        closeOnClick={true}
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
