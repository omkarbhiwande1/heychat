import axios from "axios";
export const signup = (user, history) => async (dispatch, getState)=>{
    try{
        dispatch({type: 'IS_LOADING', payload: []})
        // dispatch({type: 'CLEAR_ERRORS', payload: []})

        const res = await axios.post('/signup',user);

        const token = res.data.token;
        // console.log(token);
        saveToken(token);

        dispatch({type: 'LOGIN_USER', payload: res.data});
        
        history.push("/");
        
    }
    catch(err){
        console.log(err.response.data);      
    }
    finally{
        dispatch({type: 'IS_NOT_LOADING', payload: []})

    }

    
}
export const logout = () => (dispatch)=>{
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['authorization'];
    dispatch({type: 'LOGOUT_USER', payload: false});  
}

export const login = (user, history) => async (dispatch, getState)=>{
    try{
        console.log("Hello");
        dispatch({type: 'IS_LOADING', payload: []})
        
        const res = await axios.post('/login',user);
        const token = res.data.token;
 
        saveToken(token);

        dispatch({type: 'LOGIN_USER', payload: res.data});
        
        history.push("/");
        
    }
    catch(err){
        console.log(err.response.data);      
    }
    finally{
        dispatch({type: 'IS_NOT_LOADING', payload: []})

    }

    
}

export const findUsers = (searchText)=> async (dispatch) =>{
    
    try{
        dispatch({type: 'IS_LOADING', payload: true})
        
        const res = await axios.post('/search',{searchText});
        // console.log("Users are",res.data);

        dispatch({type: 'SET_SEARCH_RESULT', payload: res.data})
    }catch(err){
        console.log(err.response.data);
    }
    finally{
        dispatch({type: 'IS_NOT_LOADING', payload: false})

    }
}

export const getUserData = () => async (dispatch) =>{
    try{
        const res = await axios.get('/user');
        dispatch({'type':'LOGIN_USER','payload': res.data})
    }catch(err){
        // console.log(err.response);
        console.log(err.response.data);
    }
}
const saveToken = (token) =>{
    const finalToken = `Bearer ${token}`;
    // console.log('token');
    localStorage.setItem('token', finalToken);
    axios.defaults.headers.common['authorization'] = finalToken;
    // console.log(finalToken);
}