import { combineReducers } from "redux";

import postReducer, * as fromPostReducer from "./postReducer";
import tagReducer, * as fromTagReducer from "./tagReducer";
import articleReducer, * as fromArticleReducer from "./articleReducer";
import commentReducer, * as fromCommentReducer from "./commentReducer";

const rootReducer = combineReducers({
    post: postReducer,
    tag: tagReducer,
    article: articleReducer,
    comment: commentReducer

});

export default rootReducer;