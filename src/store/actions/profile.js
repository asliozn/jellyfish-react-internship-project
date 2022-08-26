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


export const followUser = (username) => async (dispatch) =>{

    
    
    const user = JSON.parse(localStorage.getItem('user'));

    const config = {
        headers: { Authorization: `Bearer ${user.token}`,}
    }   
    console.log(user.token);
    try {
            const res = await axios.post(`https://api.realworld.io/api/profiles/${username}/follow`, '',config);
            const data = res.data;
                dispatch({  
                    type: types.FOLLOW_USER,
                    payload: data
                });
        
        } catch (error) {
                console.log(error);
        }
}
export const unfollowUser = (username) => async (dispatch) =>{
        
            const user = JSON.parse(localStorage.getItem('user'));
            const config = {
                headers: { Authorization: `Bearer ${user.token}`,}
            }
            try {
                    const res = await axios.delete(`https://api.realworld.io/api/profiles/${username}/follow`,config);
                    const data = res.data;
                        dispatch({  
                            type: types.UNFOLLOW_USER,
                            payload: data
                        });
                
                } catch (error) {
                        console.log(error);
                }
        }


