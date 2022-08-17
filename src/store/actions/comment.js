import axios from 'axios';
import * as types from './types';


export const fetchCommentsBySlug = (slug) => async (dispatch) => {
    try {
        const res = await axios.get(`https://api.realworld.io/api/articles/${slug}/comments`);
        const data = await res.data;
        console.log(data);
        dispatch({
            type: types.FETCH_COMMENTS_BY_SLUG,
            payload: data
        });
    } catch (error) {
        console.log(error);
    }
}
