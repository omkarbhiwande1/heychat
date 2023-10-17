const initialState = {
    isAuthenticated: false,
    user: null,
    userid: null,
    username: null,
    searchResults: []
}
export default function(state = initialState, action){
    switch(action.type){
        case 'SET_AUTHENTICATED':
            return{
                ...state,
                isAuthenticated: true
            }
        case 'LOGIN_USER':
            return{
                ...state,
                isAuthenticated: true,
                user: {
                    username: action.payload.username,
                    userid: action.payload.userid
                },
                userid: action.payload.userid,
                username: action.payload.username
            }
        case 'LOGOUT_USER':
            return{
                ...state,
                user: null,
                userid: null,
                isAuthenticated: false,
                username: null
            }
        case 'SET_SEARCH_RESULT':
            return{
                ...state,
                searchResults: action.payload
            }
        case 'CLEAR_SEARCH_RESULTS':
            return{
                ...state,
                searchResults: action.payload
            }
        default: 
            return state
    }
}