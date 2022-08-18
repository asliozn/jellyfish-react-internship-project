import * as types from './types';
import axios from 'axios';


export const getProfile = (username) => async (dispatch) =>{
    try {
        const res = await axios.get(`https://api.realworld.io/api/profiles/${username}`);
        const data = res.data;
        //console.log(data);
        dispatch({
            type: types.GET_PROFILE,
            payload: data
        });
    } catch (error) {
        console.log(error);
    }
}

