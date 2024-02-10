const initialState = {
  order: {},
};

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_ORDER":
      let cstOrder = { ...state, order: action.payload };
      localStorage.setItem("order", JSON.stringify(cstOrder));
      return cstOrder;

    case "REFRESH_ORDER":
      if (localStorage.getItem("order")) {
        state = JSON.parse(localStorage.getItem("order"));
      }
      return state;

    case "REMOVE_ORDER":
      localStorage.removeItem("order");
      return initialState;

    default:
      return state;
  }
};
