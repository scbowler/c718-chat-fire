import types from '../actions/types';

const DEFAULT_STATE = {
    chatId: null,
    description: '',
    messages: {},
    roomList: {},
    title: '',
    topic: ''
};

export default (state = DEFAULT_STATE, action) => {
    switch(action.type){
        case types.GET_CHAT_MESSAGES:
            return { ...state, messages: action.messages };
        case types.GET_ROOM_INFORMATION:
            return { ...state, ...action.roomInfo };
        case types.GET_ROOM_LIST:
            return { ...state, roomList: action.roomList };
        default:
            return state;
    }
}
