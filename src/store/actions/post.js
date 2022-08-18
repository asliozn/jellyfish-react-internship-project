import * as types from './types';
import axios from 'axios';



export const fetchPosts = () => async (dispatch) => {

    try {
        const res = await fetch('https://api.realworld.io/api/articles?limit=20&offset=0');
        const data = await res.json();
        //console.log(data);
        dispatch({
        type: types.FETCH_POSTS,
        payload: data
    });
    } catch (error) {
        console.log(error);
    }
    
}

export const createArticle = (values) =>async (dispatch) => {

    const user = JSON.parse(localStorage.getItem('user'));
    const config = {
        headers: { Authorization: `Bearer ${user.token}`}
      }
    const payload1 = {
        "article": {
          "title": values.title,
          "description": values.description,
          "body": values.body,
        }
    }
    try {
        const response = await axios.post('https://api.realworld.io/api/articles', payload1,config)
        console.log(response.data)
        dispatch({
            type: types.CREATE_ARTICLE,
            payload: response.data
        });
      } catch (e) {
        console.log(e)
      }     

}

export const getArticlesByAuthor = (username) => async (dispatch) => {
  try {
      const res = await axios.get(`https://api.realworld.io/api/articles?author=${username}`);
      const data = await res.data;
      //console.log(data);
      dispatch({
          type: types.GET_ARTICLES_BY_AUTHOR,
          payload: data
      });
  } catch (error) {
      console.log(error);
  }
}