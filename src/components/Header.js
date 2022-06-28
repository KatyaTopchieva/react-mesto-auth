import React from "react";
import { withRouter } from "react-router-dom";
import logo from '../images/logo.svg';
import './styles/Header.css';

class Header extends React.Component {
    constructor(props) {
      super(props);
    }

    render(){
      return(
        <header className="header">
            <img className="header__logo" src={logo} alt="Логотип" />
            <div className={this.props.loggedIn ?
                  'header__email-button-container_visible' : 'header__email-button-container'}>
                <p className="header__email">{this.props.email}</p>
                <button type="button" onClick={this.props.onExit} className="header__button-exit">Выйти</button>
            </div>
        </header>
      )
    }
}

export default withRouter (Header);