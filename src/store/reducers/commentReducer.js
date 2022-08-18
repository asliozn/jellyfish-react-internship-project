import * as types from '../actions/types';

const initialState = {
    comments: [
        {
          id: "",
          createdAt: "",
          updatedAt: "",
          body: "",
          author: {
            username: "",
            bio: "",
            image: "",
            following: "",
          }
        },
    ]
}

export default function commentReducer(state = initialState, action) {
    switch (action.type) {
        case types.FETCH_COMMENTS_BY_SLUG:
            return {
                ...state,
                comments: action.payload
            };

        case types.ADD_COMMENT:
            return {
                ...state,
                comments: [ ...state.comments, action.payload ]
            };
        case types.DELETE_COMMENT:
            return {
                ...state,
                comments: state.comments.filter(comment => comment.id !== action.payload)
            };
        default:
            return {...state,};
    }
}


