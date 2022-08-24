import { combineReducers } from "redux";

import postReducer from "./postReducer";
import tagReducer from "./tagReducer";
import articleReducer from "./articleReducer";
import commentReducer from "./commentReducer";
import userReducer  from "./userReducer";
import profileReducer from "./profileReducer";

const rootReducer = combineReducers({
    post: postReducer,
    tag: tagReducer,
    article: articleReducer,
    comment: commentReducer,
    user: userReducer,
    profile: profileReducer,

});

export default rootReducer;