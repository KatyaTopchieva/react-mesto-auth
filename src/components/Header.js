import React from "react";
import { withRouter } from "react-router-dom";
import logo from '../images/logo.svg';
import './styles/Header.css';

class Header extends React.Component {
    constructor(props) {
      super(props);
    }


    click = ()=>{
      if(this.props.signLable === "Выйти"){
        this.props.onExit();
      }

      this.props.history.push(this.props.signPath);      
    }

    render(){
      return(
        <header className="header">
            <img className="header__logo" src={logo} alt="Логотип" />
            <div className="header__email-button-container">
                <p className={this.props.loggedIn ?
                  'header__email' : 'header__email_unVisible'}>{this.props.email}</p>
                <button type="button" onClick={this.click}
                className="header__button-exit">{this.props.signLable}</button>
            </div>
        </header>
      )
    }
}

export default withRouter (Header);