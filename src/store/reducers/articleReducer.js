import * as types from '../actions/types';

const initialState = {
    article : {
        slug: '',
        title: '',
        description: '',
        body: '',
        tagList: [],
        createdAt: '',
        updatedAt: '',
        favorited: false,
        favoritesCount: 0,
        author: {
            username: '',
            bio: '',
            image: '',
            following: false
        }
    }
}

export default function articleReducer(state = initialState, action) {
    switch (action.type) {
        case types.FETCH_ARTICLE:
            return {
                ...state,
                article: action.payload
            };
        default:
            return {...state,};
    }
}



