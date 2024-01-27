import { combineReducers } from "redux";
import { userReducer } from "./userReducer";
import { cartReducer } from "./cartReducer";

export const rootReducer = combineReducers({
  userReducer: userReducer,
  cartReducer: cartReducer,
});
