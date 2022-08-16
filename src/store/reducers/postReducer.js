import * as types from '../actions/types';

const initialState = {
    posts:{
        "article": {
          "title": "",
          "description": "",
          "body": "",
        }
    }
}

export default function postReducer(state = initialState, action) {
    switch (action.type) {
        case types.FETCH_POSTS:
            return {
                ...state,
                posts: action.payload
            };
        case types.CREATE_ARTICLE:
            return {
                ...state,
                posts: [ ...state.posts, action.payload ]
           };
        default:
           return {...state,};
    }
}
