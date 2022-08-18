import * as types from '../actions/types';

const initialState = {
    user: {
        email: "",
        token: "",
        username: "",
        bio: "",
        image: ""
      }
  
};

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case types.GET_CURRENT_USER:
            return {
                ...state,
                user: action.payload
            };
        default:
            return {...state,};
    }
}

