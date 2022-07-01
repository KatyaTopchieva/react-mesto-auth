import React from "react";
import './styles/Login.css';
import * as auth from '../auth.js';
import PopupWithForm from './PopupWithForm';
import { withRouter } from 'react-router-dom';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
        this.props.handleButton();

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const {name, value} = e.target;
        this.setState({
          [name]: value
        });
    }
 
    finish = (data) => {
      if(data.token) {
        this.setState({
          email: '', 
          password: ''
        }, () => {
          this.props.handleLogin();
          this.props.history.push('/');
        })
      }  
    }

    handleSubmit(e){
      e.preventDefault();
      if (!this.state.email || !this.state.password){
          return;
      }
    
      this.props.authorize(this.state.email, this.state.password, this.finish);
      // .then((data) => {
      //   if(data.token) {
      //     this.setState({
      //       email: '', 
      //       password: ''
      //     }, () => {
      //       this.props.handleLogin();
      //       this.props.history.push('/');
      //     })
      //   }  
      // })
      // .catch(err => console.log(err));
    }
      render() {
          return(
            <>
              <PopupWithForm
                name="login"
                title="Вход"
                buttonText="Войти"
                isOpen={true}
                submit={this.handleSubmit}
              >
                <div className="popup__input-container popup__input-container">
                    <input type="email"
                        value={this.state.email}
                        onChange={this.handleChange}
                        className="popup__input popup__input_el_email popup__input_login"
                        id="email-input"
                        name="email" 
                        placeholder="Email" 
                        required />
                    <span className="popup__error email-input-error"></span>
                    <input type="password"
                        value={this.state.password}
                        onChange={this.handleChange}
                        className="popup__input popup__input_el_password popup__input_login"
                        id="password-input"
                        name="password" 
                        placeholder="Пароль" 
                        required 
                        minLength="2" 
                        maxLength="40" />
                    <span className="popup__error password-input-error"></span>
                </div>
              </PopupWithForm>
            </>
          )
      }
}

export default withRouter (Login);
