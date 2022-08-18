import * as types from '../actions/types';

const initialState = {
    profile: {
        username: "",
        bio: "",
        image: "",
        "following": "",
      }
};

export default function profileReducer(state = initialState, action) {
    switch (action.type) {
        case types.GET_PROFILE:
            return {
                ...state,
                profile: action.payload
            };
        default:
            return {...state,};
    }
}

