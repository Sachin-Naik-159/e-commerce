import { toast } from "react-toastify";

const initialState = {
  cart: [],
};

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_CART":
      const cstState = { ...state, cart: [...state.cart, action.payload] };
      localStorage.setItem("cart", JSON.stringify(cstState));
      toast.success("Added");
      return cstState;

    case "REMOVE_CART":
      const result = state.cart.find(({ _id }) => _id === action.payload._id);
      if (result !== undefined) {
        const index = state.cart.indexOf(result);
        state.cart.splice(index, 1);
        toast.success("Removed");
      } else toast.error("Not in cart");
      localStorage.setItem("cart", JSON.stringify(state));
      return state;

    case "REFRESH_CART":
      if (localStorage.getItem("cart")) {
        state = JSON.parse(localStorage.getItem("cart"));
      }
      return state;

    case "CHECKOUT_CART":
      localStorage.removeItem("cart");
      return initialState;

    default:
      return state;
  }
};
