import axios from "axios";
export const getConversations =()=> async (dispatch)=>{
    try{
        dispatch({type: 'IS_LOADING',payload: true});
        const res = await axios.get('/conversations');
        // console.log(res.data);
        dispatch({type: 'SET_CONVERSATIONS', payload: res.data});
    }catch(err){
        console.log(err)
    }
    finally{
        dispatch({type: 'IS_NOT_LOADING',payload: true});
    }
}
export const getCurrentConversation =(rid,tchat)=> async (dispatch)=>{
    try{
        dispatch({type: 'IS_LOADING',payload: true});
        // console.log(rid,tchat);
        const res = await axios.get(`/currentconversation/${rid}/${tchat}`);
        // console.log(res.data);
        dispatch({type: 'SET_CURRENT_CONVERSATION', payload: res.data});
    }catch(err){
        console.log(err)
    }
    finally{
        dispatch({type: 'IS_NOT_LOADING',payload: true});
    }
}
export const sendChat = (socket,data)=> async (dispatch)=>{
    try{
        // console.log("data is",data);
        const res = await axios.post('/chat',data);
        console.log("res data is",res.data );
        console.log("Previous chat identity was",res.data.previousChatIdentity);
        if(res.data.previousChatIdentity){
            socket.emit('send-message',res.data);
        }
        else{
            dispatch({type: 'UPDATE_CURRENT_CHAT_IDENTITY', payload: res.data.chatidentity});
        }   
        dispatch({type: 'UPDATE_CURRENT_CONVERSATION', payload: res.data});
    }catch(err){
        console.log(err)
    }
    finally{
        // dispatch({type: 'IS_NOT_LOADING',payload: true});
    }
}
export const sendSocketChat = (data)=> async (dispatch)=>{
    try{
        dispatch({type: 'UPDATE_CURRENT_CONVERSATION', payload: data});
    }catch(err){
        console.log(err)
    }
    finally{
        // dispatch({type: 'IS_NOT_LOADING',payload: true});
    }
}

/////////////////////////////////////////////////////////// Unused functions
// export const loadTempChat = (uid)=> async (dispatch)=>{
//     try{
//         dispatch({type: 'IS_LOADING',payload: true});
//         const res = await axios.get(`/tchat/${uid}`,{uid});
//         // console.log(res.data);
//         dispatch({type: 'SET_TEMP_CHAT', payload: res.data});
//     }catch(err){
//         console.log(err)
//     }
//     finally{
//         dispatch({type: 'IS_NOT_LOADING',payload: true});
//     }
// }

// export const sendTempChat = (data)=> async (dispatch)=>{
//     try{
//         // dispatch({type: 'IS_LOADING',payload: true});
//         const res = await axios.post('/tchat',data);
//         // console.log(res.data);
//         dispatch({type: 'UPDATE_TEMP_CHAT', payload: res.data});
//     }catch(err){
//         console.log(err)
//     }
//     finally{
//         // dispatch({type: 'IS_NOT_LOADING',payload: true});
//     }
// }