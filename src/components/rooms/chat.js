import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getMessages, getRoomInfo } from '../../actions';

class Chat extends Component {
    roomRef = null;
    chatRef = null;

    componentDidMount(){
        const { getRoomInfo, match: { params } } = this.props;
        
        this.roomRef = getRoomInfo(params.room_id);
    }

    componentDidUpdate(prevProps){
        const { chatId, getMessages } = this.props;
        
        if(chatId && prevProps.chatId !== chatId){
            this.chatRef = getMessages(chatId);
        }
    }

    componentWillUnmount(){
        if(this.roomRef){
            this.roomRef.off();
        }
        if(this.chatRef){
            this.chatRef.off();
        }
    }

    render(){
        const { description, messages, title, topic } = this.props;
        const messageElements = Object.keys(messages).map(key => {
            const {name, message} = messages[key];
            return (
                <li key={key} className="collection-item">
                    <b>{name}:</b> {message}
                </li>
            );
        });
        return (
            <div>
                <div className="center">
                    <h1>{title || 'Chat Room'}</h1>
                    <h5 className="grey-text">{topic}</h5>
                    <p className="grey-text">{description}</p>
                </div>
                
                <ul className="collection">
                    {messageElements}
                </ul>
            </div>
        );
    }
}

function mapStateToProps(state){
    return { ...state.chat };
}

export default connect(mapStateToProps, {
    getMessages,
    getRoomInfo
})(Chat);
