import * as React from 'react';
import '../stylesheets/App.scss';
import { Link } from 'react-router-dom';

const logo = require('../assets/logo.svg');

const Header = () => (
    <div className="app-header">
        <Link to='/'>
            <div>
                <img src={logo} className="app-logo" alt="logo" />
            </div>
            <div className="app-title">
                <h2>Bootcamp Slides</h2>
                <span>Information for the Information Age.</span>
            </div>
        </Link>
    </div>
);

export default Header;