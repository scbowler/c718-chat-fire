import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { getMessages, getRoomInfo, sendMessage } from '../../actions';
import Input from '../general/input';

class Chat extends Component {
    roomRef = null;
    chatRef = null;

    componentDidMount(){
        const { getRoomInfo, match: { params } } = this.props;
        
        this.roomRef = getRoomInfo(params.room_id);
    }

    scrollToBottom(){
        this.logRef.scrollTop = this.logRef.scrollHeight;
    }

    componentDidUpdate(prevProps){
        const { chatId, getMessages } = this.props;
        
        if(chatId && prevProps.chatId !== chatId){
            this.chatRef = getMessages(chatId);
        }

        this.scrollToBottom();
    }

    componentWillUnmount(){
        if(this.roomRef){
            this.roomRef.off();
        }
        if(this.chatRef){
            this.chatRef.off();
        }
    }

    handleSendMessage = ({message}) => {
        const { chatId, reset, sendMessage } = this.props;

        if(chatId){
            sendMessage(chatId, message);
            reset();
        }
    }

    render(){
        const { description, handleSubmit, messages, title, topic } = this.props;

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
                
                <ul ref={e => this.logRef = e} className="collection chat-log">
                    {messageElements}
                </ul>
                <form className="row" onSubmit={handleSubmit(this.handleSendMessage)}>
                    <div className="col s10">
                        <Field name="message" label="Message" component={Input}/>
                    </div>
                    <div className="col s2 center-align">
                        <button className="btn orange send-button">Send</button>
                    </div>
                </form>
            </div>
        );
    }
}

Chat = reduxForm({
    form: 'chat-message'
})(Chat);

function mapStateToProps(state){
    return { ...state.chat };
}

export default connect(mapStateToProps, {
    getMessages,
    getRoomInfo,
    sendMessage
})(Chat);
