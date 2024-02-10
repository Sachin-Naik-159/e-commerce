import React, { useState } from "react";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function PaymentMethod() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let cart = useSelector((state) => {
    return state.cartReducer.cart;
  });
  let subTotal = () => {
    var total = 0;
    for (var i = 0; i < cart.length; i++) {
      total = total + cart[i].inCart * cart[i].price;
    }
    return total;
  };

  const type = [
    { value: "PayPal", label: "PayPal" },
    { value: "Stripe", label: "Stripe" },
  ];
  const [value, setValue] = useState(null);

  const finalPage = () => {
    if (value !== null) {
      dispatch({
        type: "PAY_TYPE",
        payload: { pay: value, amount: subTotal().toFixed(2) },
      });
      navigate("/orderpreview");
    } else toast.warning("Select mode of payment");
  };

  return (
    <div className="d-grid text-center mt-3">
      <h2>Payment Method</h2>

      <Form className="d-flex justify-content-center">
        <div className="mt-5 mb-4">
          {type.map((item) => (
            <Form.Check
              reverse
              name="payment"
              type="radio"
              value={item.value}
              label={item.label}
              id={item.value}
              key={item.value}
              checked={value === item.value}
              onChange={(e) => setValue(e.target.value)}
              className="mt-3"
            />
          ))}
        </div>
      </Form>
      <div className="d-flex justify-content-center">
        <Button variant="warning" onClick={finalPage}>
          Continue
        </Button>
      </div>
    </div>
  );
}

export default PaymentMethod;
