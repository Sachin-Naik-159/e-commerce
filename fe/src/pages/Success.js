import React, { useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Card, Button } from "react-bootstrap";

function Success(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const api_URL = process.env.REACT_APP_BASE_API_URL;
  let order = useSelector((state) => {
    return state.orderReducer.order;
  });

  //Update pament status in db
  const updatePay = async () => {
    try {
      let paymentId = order.session_id;
      let resp = await axios.put(
        `${api_URL}/user/updatePay/${order.order_id}`,
        paymentId
      );
      if (resp.status === 200) {
        toast.success(resp.data.message);
        navigate("/");
        dispatch({ type: "REMOVE_ORDER" });
      }
    } catch (err) {
      throw err;
    }
  };

  useEffect(() => {
    if (localStorage.getItem("order") === null) {
      navigate("/");
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div className="d-flex justify-center mt-5">
      <Card style={{ width: "18rem" }}>
        <h2 className="text-center">Pament Success</h2>
        <h3 className="text-center">Thank you! 🎉</h3>
        <Button variant="primary" onClick={updatePay}>
          <i className="fa-solid fa-house"></i>
        </Button>
      </Card>
    </div>
  );
}

export default Success;
