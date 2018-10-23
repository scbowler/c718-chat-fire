import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { createChatRoom } from '../../actions';
import Input from '../general/input';

class CreateRoom extends Component {
    handleSaveRoom = async values => {
        const roomId = await this.props.createChatRoom(values);

        this.props.history.push(`/rooms/${roomId}`);
    }
    
    render(){
        const { handleSubmit } = this.props;

        return (
            <div>
                <h1 className="center">Create Chat Room</h1>
                <div className="row">
                    <form onSubmit={handleSubmit(this.handleSaveRoom)} className="col s12 m8 offset-m2">
                        <Field name="title" label="Title" component={Input}/>
                        <Field name="topic" label="Topic" component={Input}/>
                        <Field name="description" label="Description" component={Input}/>

                        <div className="row">
                            <div className="col s12 right-align">
                                <button className="btn orange">Create Room</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

CreateRoom = reduxForm({
    form: 'create-room'
})(CreateRoom);

export default connect(null, {
    createChatRoom
})(CreateRoom);
