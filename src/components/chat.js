import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getMessages } from '../actions';

class Chat extends Component {
    componentDidMount(){
        this.dbRef = this.props.getMessages();
    }

    componentWillUnmount(){
        this.dbRef.off();
    }

    render(){
        const { messages } = this.props;
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
                <h1 className="center">Chat Room</h1>
                <ul className="collection">
                    {messageElements}
                </ul>
            </div>
        );
    }
}

function mapStateToProps(state){
    return {
        messages: state.chat.messages
    }
}

export default connect(mapStateToProps, {
    getMessages: getMessages
})(Chat);
