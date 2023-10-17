import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import uiReducer from './reducers/uiReducer';
import userReducer from './reducers/userReducer';
import chatReducer from './reducers/chatReducer';
const initialState={}

let middleware=[thunk];

const allReducers = combineReducers({
    user: userReducer,
    ui: uiReducer,
    chat: chatReducer
});
const store = createStore(allReducers,initialState,compose(
    applyMiddleware(...middleware)
))
export default store;