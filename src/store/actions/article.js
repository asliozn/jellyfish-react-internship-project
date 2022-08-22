import axios from 'axios';
import * as types from './types';


export const fetchArticle = (slug) => async (dispatch) => {
    try {
        const res = await axios.get(`https://api.realworld.io/api/articles/${slug}`);
        const data = await res.data;
        //console.log(data);
        dispatch({
            type: types.FETCH_ARTICLE,
            payload: data
        });
    } catch (error) {
        console.log(error);
    }
}


