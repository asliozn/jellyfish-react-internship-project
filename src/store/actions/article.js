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

export const deleteArticle = (slug) => async (dispatch) => {

    const user = JSON.parse(localStorage.getItem('user'));
    const config = {
        headers: { Authorization: `Bearer ${user?.token}`}
    }
    try {
        const res = await axios.delete(`https://api.realworld.io/api/articles/${slug}`,config)
        console.log(res.data)
        dispatch({
            type: types.DELETE_ARTICLE,
            payload: res.data
        });
    } catch (e) {
        console.log(e)
    }
}



