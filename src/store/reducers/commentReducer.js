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
        default:
            return {...state,};
    }
}


