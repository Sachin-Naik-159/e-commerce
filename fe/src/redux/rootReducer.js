import { combineReducers } from "redux";
import { userReducer } from "./userReducer";
import { cartReducer } from "./cartReducer";
import { orderReducer } from "./orderReducer";

export const rootReducer = combineReducers({
  userReducer: userReducer,
  orderReducer: orderReducer,
  cartReducer: cartReducer,
});
