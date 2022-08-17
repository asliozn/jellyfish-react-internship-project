import * as types from '../actions/types';

const initialState = {

        tags: [
            "",
          ]
    
}

export default function tagReducer(state = initialState, action) {
    switch (action.type) {
        case types.FETCH_TAGS:
            return {
                ...state,
                tags: action.payload
            };
        default:
            return {...state,};
    }
}
