import axios from 'axios';
import * as types from './types';

export const fetchTags = () => async (dispatch) => {
    try {
        const res = await axios.get('https://api.realworld.io/api/tags');
        const data = res.data;
        //console.log(data);
        dispatch({
            type: types.FETCH_TAGS,
            payload: data
        });
    } catch (error) {
        console.log(error);
    }
}
