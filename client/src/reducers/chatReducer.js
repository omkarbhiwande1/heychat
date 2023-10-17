const initialState = {
    tempChat: null,
    conversations: [],
    currentConversation: null,
    currentChatIdentity: null
}
export default function(state = initialState, action){
    switch(action.type){
        case 'SET_TEMP_CHAT':
            return {
                ...state,
                tempChat: action.payload
            }
        case 'UPDATE_TEMP_CHAT':
            return {
                ...state,
                tempChat: {
                    ...state.tempChat,
                    messages: [
                        ...state.tempChat.messages,
                        action.payload
                    ]
                }
            }
        case 'SET_CONVERSATIONS':
            return {
                ...state,
                conversations: action.payload,
                currentChatIdentity: action.payload.chatidentity
            }
        
        case 'SET_CURRENT_CONVERSATION':
            
            
            return {
                ...state,
                currentConversation:  action.payload,
                currentChatIdentity: action.payload.chatidentity
            }
        
        case 'UPDATE_CURRENT_CONVERSATION':
            
            
            return {
                ...state,
                currentConversation:  {
                    ...state.currentConversation,
                    messages: [
                        ...state.currentConversation.messages,
                        action.payload
                    ]
                }
            }
        case 'UPDATE_CURRENT_CHAT_IDENTITY':
            return {
                ...state,
                currentChatIdentity: action.payload
            }
        default: 
            return state
    }
}