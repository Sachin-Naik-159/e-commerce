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
    const pub_url = process.env.PUBLIC_URL;

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
        <Route basename={pub_url} path="/paysuccess" element={<Success />} />

        <Route basename={pub_url} path="/" element={<Home />} />
        <Route basename={pub_url} path="/search" element={<Home />} />
        <Route basename={pub_url} path="/cart" element={<Cart />} />
        <Route basename={pub_url} path="/login" element={<Login />} />
        <Route basename={pub_url} path="/signup" element={<Signup />} />
        <Route basename={pub_url} path="/profile" element={<Profile />} />
        <Route basename={pub_url} path="/userlist" element={<UserList />} />
        <Route basename={pub_url} path="/product/:id" element={<Product />} />
        <Route
          basename={pub_url}
          path="/address"
          element={<ShippingAddress />}
        />
        <Route
          basename={pub_url}
          path="/userallorders"
          element={<AllOrders />}
        />
        <Route
          basename={pub_url}
          path="/adminallorders"
          element={<AllOrders />}
        />
        <Route
          basename={pub_url}
          path="/orderpreview"
          element={<OrderPreview />}
        />
        <Route
          basename={pub_url}
          path="/orderdetail/:id"
          element={<OrderDetail />}
        />
        <Route
          basename={pub_url}
          path="/createproduct"
          element={<CreateProduct />}
        />
        <Route
          basename={pub_url}
          path="/prodadminlist"
          element={<ProdAdminList />}
        />
        <Route
          basename={pub_url}
          path="/paymentmethod"
          element={<PaymentMethod />}
        />
        <Route
          basename={pub_url}
          path="/editproduct/:id"
          element={<EditProduct />}
        />
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
