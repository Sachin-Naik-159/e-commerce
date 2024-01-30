import { toast } from "react-toastify";

const initialState = {
  cart: [],
};

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_CART":
      let found = state.cart.find(({ _id }) => _id === action.payload._id);
      let cstState = state;
      if (found === undefined) {
        cstState = { ...state, cart: [...state.cart, action.payload] };
        localStorage.setItem("cart", JSON.stringify(cstState));
        toast.success("Added");
        return cstState;
      } else {
        const ind = state.cart.indexOf(found);
        if (state.cart[ind].inCart < 10) {
          state.cart[ind].inCart = state.cart[ind].inCart + 1;
          localStorage.setItem("cart", JSON.stringify(state));
          toast.success("Added");
          return state;
        } else {
          toast.warning("Already 10 products");
          return state;
        }
      }

    case "REMOVE_CART":
      const res = state.cart.find(({ _id }) => _id === action.payload._id);
      if (res !== undefined) {
        const i = state.cart.indexOf(res);
        if (state.cart[i].inCart > 1) {
          state.cart[i].inCart = state.cart[i].inCart - 1;
          localStorage.setItem("cart", JSON.stringify(state));
          toast.success("Removed");
          return state;
        } else {
          toast.warning("Please Delete");
          return state;
        }
      }
      return state;

    case "DELETE_CART":
      const result = state.cart.find(({ _id }) => _id === action.payload._id);
      if (result !== undefined) {
        const index = state.cart.indexOf(result);
        state.cart.splice(index, 1);
        toast.success("Deleted");
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
