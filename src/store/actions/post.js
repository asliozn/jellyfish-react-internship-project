import * as types from './types';
import axios from 'axios';


export const fetchPosts = () => async (dispatch) => {


    const user = JSON.parse(localStorage.getItem('user'));

    try {

        if  (user) {

        const res = await fetch('https://api.realworld.io/api/articles?limit=50&offset=0',{
            method: "GET",
            headers: { Authorization: `Bearer ${user?.token}`}
          });
        const data = await res.json();
        //console.log(data);
        dispatch({
        type: types.FETCH_POSTS,
        payload: data
    });}

    else {
        const res = await fetch('https://api.realworld.io/api/articles?limit=20&offset=0');
        const data = await res.json();
        //console.log(data);
        dispatch({
        type: types.FETCH_POSTS,
        payload: data
    });} 
}
    catch (error) {
        console.log(error);
    }
    
}

export const fetchPostsByTag = (tag) => async (dispatch) => {

    try {
        const res = await fetch(`https://api.realworld.io/api/articles?tag=${tag}&limit=20&offset=0`);
        const data = await res.json();
        //console.log(data);
        dispatch({
        type: types.FETCH_POSTS_BY_TAG,
        payload: data
    });
    } catch (error) {
        console.log(error);
    }

}

var addItem = function (response) {
    var oldItems = JSON.parse(localStorage.getItem('articles')) || [];
    
    var newItem = JSON.stringify(response.data);
    
    oldItems.push(newItem);
    
    localStorage.setItem('articles', JSON.stringify(oldItems));
};


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
          "tagList": values.tags
        }
    }
    try {
        const response = await axios.post('https://api.realworld.io/api/articles', payload1,config)
        console.log(response.data.article);
        console.log(localStorage.getItem('articles'));
        addItem(response);
        console.log(localStorage.getItem('articles'));

        dispatch({
            type: types.CREATE_ARTICLE,
            payload: response.data
        });
      } catch (e) {
        console.log(e)
      }     

}

export const getArticlesByAuthor = (username) => async (dispatch) => {
    const user = JSON.parse(localStorage.getItem('user'));
    const config = {
        headers: { Authorization: `Bearer ${user.token}`}
      }
  try {
      const res = await axios.get(`https://api.realworld.io/api/articles?author=${username}`,config);
      const data = await res.data;
      console.log(data);
      dispatch({
          type: types.GET_ARTICLES_BY_AUTHOR,
          payload: data
      });
  } catch (error) {
      console.log(error);
  }
}



export const getFollowFeed = () => async (dispatch) => {
    const user = JSON.parse(localStorage.getItem('user'));
    const config = {
        headers: { Authorization: `Bearer ${user.token}`}
    }
    try {
        const res = await fetch('https://api.realworld.io/api/articles/feed?limit=20&offset=0', config);
        const data = await res.json();
        //console.log(data);
        dispatch({
            type: types.GET_FOLLOW_FEED,
            payload: data
        });
    } catch (error) {
        console.log(error);
    }
}


export const getArticlesByFavorited = (username) => async (dispatch) => {

    const user = JSON.parse(localStorage.getItem('user'));
    const config = {
        headers: { Authorization: `Bearer ${user.token}`}
    }

    try {
        const res = await axios.get(`https://api.realworld.io/api/articles?favorited=${username}&limit=20&offset=0`,'',config);

        const data = await res.data;
        //console.log(data);
        dispatch({
            type: types.GET_ARTICLES_BY_FAVORITED,
            payload: data
        });
    } catch (error) {
        console.log(error);
    }
}


export const likeArticle = (slug) => async (dispatch) => {

    const user = JSON.parse(localStorage.getItem('user'));
 
    const config = {
        headers: { Authorization: `Bearer ${user?.token}`}
      }
    try {
        const res = await axios.post(`https://api.realworld.io/api/articles/${slug}/favorite`,'',config)
        console.log(res.data)
        dispatch({
            type: types.LIKE_ARTICLE,
            payload: res.data
        });
    } catch (error) {
        console.log(error);
    }
}

export const unlikeArticle = (slug) => async (dispatch) => {
    
        const user = JSON.parse(localStorage.getItem('user'));
        const config = {
            headers: { Authorization: `Bearer ${user?.token}`}
        }
        try {
            const response = await axios.delete(`https://api.realworld.io/api/articles/${slug}/favorite`,config)
            console.log(response.data)
            dispatch({
                type: types.UNLIKE_ARTICLE,
                payload: response.data
            });
        } catch (e) {
            console.log(e)
        }     
    }