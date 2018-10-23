import 'materialize-css/dist/css/materialize.min.css';
import React from 'react';
import Nav from './nav';
import AppRoutes from './app_routes';

const App = () => (
    <div>
        <Nav/>
        <div className="container">
            <AppRoutes/>
         </div>
    </div>
);

export default App;
