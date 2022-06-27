import React from "react";
import logo from '../images/logo.svg';
import { Link, withRouter } from 'react-router-dom';
import './styles/Header.css';

function Header() {
    return (
        <header className="header">
            <img className="header__logo" src={logo} alt="Логотип" />
            <div className="header__email-button-cjntainer">
                <p className="header__email"></p>
                <Link to="/sign-up" className="header__button-exit">Выйти</Link>
            </div>
            
        </header>
    )
}

export default withRouter(Header);