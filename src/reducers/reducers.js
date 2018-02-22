import { combineReducers } from "redux";

import mainReducer from "./MainReducer";

export default combineReducers({
  main: mainReducer
});