import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getRoomList } from '../../actions';

class Lobby extends Component {
    roomsRef = null;

    componentDidMount(){
        this.roomsRef = this.props.getRoomList();
    }

    componentWillUnmount(){
        if(this.roomsRef) this.roomsRef.off();
    }

    render(){
        const { list } = this.props;

        const roomElements = Object.keys(list).map(id => {
            const { description, title, topic } = list[id];
            const path = `/rooms/${id}`;

            return (
                <li key={id} className="collection-item row">
                    <div className="col m3 s12">
                        <b><Link to={path}>{title}</Link></b>
                    </div>
                    <div className="col m3 s12">
                        <Link to={path}>{topic}</Link>
                    </div>
                    <div className="col m6 s12">
                        <Link to={path}>{description}</Link>
                    </div>
                </li>
            );
        });

        return (
            <div>
                <h1 className="center">Chat Lobby</h1>
                <div className="row">
                    <div className="col s12 right-align">
                        <Link to="/rooms/create" className="btn orange">Create Room</Link>
                    </div>
                </div>
                <ul className="collection rooms-list">
                    {roomElements}
                </ul>
            </div>
        );
    }
}

function mapStateToProps(state){
    return {
        list: state.chat.roomList
    }
}

export default connect(mapStateToProps, {
    getRoomList
})(Lobby);
