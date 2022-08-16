import { createStore, applyMiddleware, compose } from "redux";
import  thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";

import rootReducer from "./reducers/rootReducer";

//import { reducers } from "./reducers";

//const store = createStore(reducers);

const store = createStore(rootReducer, {} ,
    compose(applyMiddleware(thunk), 
    composeWithDevTools()));

export default store;