import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Lobby extends Component {
    render(){
        return (
            <div>
                <h1 className="center">Chat Lobby</h1>
                <div className="row">
                    <div className="col s12 right-align">
                        <Link to="/rooms/create" className="btn orange">Create Room</Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default Lobby;
