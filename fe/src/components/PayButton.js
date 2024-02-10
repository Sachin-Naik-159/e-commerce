import React from "react";
import axios from "axios";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function PayButton({ orderDetail }) {
  const navigate = useNavigate();
  const api_URL = process.env.REACT_APP_BASE_API_URL;

  // This value is from the props in the UI
  const style = { layout: "vertical", shape: "pill", label: "pay" };

  // Custom component to wrap the PayPalButtons and show loading spinner
  const ButtonWrapper = ({ showSpinner, orderDetail }) => {
    const [{ isPending }] = usePayPalScriptReducer();

    //Update pament status in db
    const updatePay = async (paymentId) => {
      try {
        let resp = await axios.put(
          `${api_URL}/user/updatePay/${orderDetail.order_id}`,
          paymentId
        );
        if (resp.status === 200) {
          toast.success(resp.data.message);
          navigate("/");
        }
      } catch (err) {
        throw err;
      }
    };

    return (
      <>
        {showSpinner && isPending && <div className="spinner" />}
        <PayPalButtons
          style={style}
          disabled={false}
          forceReRender={[style]}
          fundingSource={undefined}
          createOrder={async (data, actions) => {
            return await actions.order.create({
              purchase_units: [
                {
                  amount: { value: orderDetail.amount },
                  reference_id: orderDetail.order_id,
                },
              ],
            });
          }}
          onApprove={async (data, actions) => {
            const order = await actions.order.capture();
            console.log(order);
            await updatePay(data.orderID);
            toast.success("Payment Successful");
          }}
          onCancel={() => {
            toast.error("Payment Cancled");
            navigate("/userallorders");
          }}
          onError={(err) => {
            console.log(err);
          }}
        />
      </>
    );
  };
  return <ButtonWrapper showSpinner={false} orderDetail={orderDetail} />;
}

export default PayButton;
