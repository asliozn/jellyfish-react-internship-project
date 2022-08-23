import * as types from '../actions/types';

const initialState = {
    posts:{
        article : {
          title: "",
          description: "",
          body: "",
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
                //posts: [ ...state.posts, action.payload ]
           };
        case types.GET_ARTICLES_BY_AUTHOR:
            return {
                ...state,
                posts: action.payload
            };
        case types.GET_ARTICLES_BY_FAVORITED:
            return {
                ...state,
                posts: action.payload
            };
        case types.GET_FOLLOW_FEED:
            return {
                ...state,
                posts: action.payload
            };        
        case types.FETCH_POSTS_BY_TAG:
            return {
                ...state,
                posts: action.payload
            };
        case types.LIKE_ARTICLE:
            return {
                ...state,
                posts: action.payload
            };
        case types.UNLIKE_ARTICLE:
            return {
                ...state,
                posts: action.payload
            };
        default:
           return {...state,};
    }
}
