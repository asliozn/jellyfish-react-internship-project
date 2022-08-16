import { combineReducers } from "redux";

import postReducer, * as fromPostReducer from "./postReducer";

const rootReducer = combineReducers({
    post: postReducer,
});

export default rootReducer;