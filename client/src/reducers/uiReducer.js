const initialState = {
    isLoading: false
}
export default function(state = initialState, action){
    switch(action.type){
        case 'IS_LOADING':
            return{
                ...state,
                isLoading: true
            }
            
        case 'IS_NOT_LOADING':
            return{
                ...state,
                isLoading: false
            }
            
        default: 
            return state
    }
}