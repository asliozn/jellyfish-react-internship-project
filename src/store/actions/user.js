import * as types from './types';


export const getCurrentUser = (user1) => async (dispatch) =>{

    const config = {
        headers: { Authorization: `Bearer ${user1?.token}`      }
    }
    try {
              const res = await fetch('https://api.realworld.io/api/user', config);
              const data = await res.json();
                dispatch({  
                    type: types.GET_CURRENT_USER,
                    payload: data
                });
           
          } catch (error) {
                console.log(error);
          }
}




