import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import chatReducer from './chat_reducer';

const rootReducer = combineReducers({
    chat: chatReducer,
    form: formReducer
});

export default rootReducer;
