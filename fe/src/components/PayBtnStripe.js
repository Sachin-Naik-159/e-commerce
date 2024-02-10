import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";
import { Button } from "react-bootstrap";

function PayBtnStripe({ orderDetail }) {
  const order = orderDetail.order;

  const dispatch = useDispatch();
  const api_URL = process.env.REACT_APP_BASE_API_URL;
  const stripe_key = process.env.REACT_APP_STRIPE_CLI;
  const [loading, setLoading] = useState(false);

  //Stripe Pament
  const stripePayment = async () => {
    setLoading(true);
    try {
      const stripe = await loadStripe(stripe_key);
      const body = { order: order };
      const resp = await axios.post(
        `${api_URL}/payment/checkout-session`,
        body
      );
      if (resp.status === 200) {
        setLoading(false);
        dispatch({ type: "UPDATE_ORDER", payload: resp.data });
        const result = await stripe.redirectToCheckout({
          sessionId: resp.data.session_id,
        });
        if (result.error) {
          console.log(result.error);
          setLoading(false);
        }
        setLoading(false);
      }
    } catch (err) {
      throw err;
    }
  };

  return (
    <>
      {loading ? (
        <div className="col-md-12 mt-3 text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <Button variant="info" onClick={stripePayment}>
          <i class="fa-brands fa-stripe fa-2xl"></i>
        </Button>
      )}
    </>
  );
}

export default PayBtnStripe;
