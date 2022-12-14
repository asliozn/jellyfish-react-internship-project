import axios from 'axios';
import * as types from './types';


export const fetchCommentsBySlug = (slug) => async (dispatch) => {
    const user = JSON.parse(localStorage.getItem('user'));
    const config = {
        headers: { Authorization: `Bearer ${user?.token}`}
      }
    


    try {
        const res = await axios.get(`https://api.realworld.io/api/articles/${slug}/comments`, user? config:null);
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

export const addComment = (slug, comment) => async (dispatch) => {

    const user = JSON.parse(localStorage.getItem('user'));
    const config = {
        headers: { Authorization: `Bearer ${user.token}`}
      }
      const payload1 = {
        "comment": {
            "body": comment,
          }
      
    }
    try {
        const res = await axios.post(`https://api.realworld.io/api/articles/${slug}/comments`, payload1,config);
        const data = await res.data;
        console.log(data);

        dispatch({
            type: types.ADD_COMMENT,
            payload: data
        });
    } catch (error) {
        console.log(error);
    }
}

export const deleteComment = (slug, id) => async (dispatch) => {

    
    const user = JSON.parse(localStorage.getItem('user'));
    const config = {
        headers: { Authorization: `Bearer ${user.token}`}
      }

    console.log(slug, id);

    try {
        const res = await axios.delete(`https://api.realworld.io/api/articles/${slug}/comments/${id}`,config);
        const data = await res.data;
        console.log(data);
        dispatch({
            type: types.DELETE_COMMENT,
            payload: data
        });
    } catch (error) {
        console.log(error);
    }
}


