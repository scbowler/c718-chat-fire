import { combineReducers } from 'redux';
import chatReducer from './chat_reducer';

const rootReducer = combineReducers({
    chat: chatReducer
});

export default rootReducer;
