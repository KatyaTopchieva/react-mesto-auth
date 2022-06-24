import React from "react";
import './styles/Login.css';
import * as auth from '../auth.js';
import PopupWithForm from './PopupWithForm';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const {name, value} = e.target;
        this.setState({
          [name]: value
        });
      }
      handleSubmit(e){
        e.preventDefault();
        if (!this.state.email || !this.state.password){
            return;
        }
        auth.authorize(this.state.email, this.state.password)
        .then((data) => {
          if(data.jwt) {
            this.setState({  // сбросьте стейт, затем в колбэке установите
              email: '', 
              password: '' // затем перенаправьте его в /
            }, () => {
              this.props.handleLogin();// стейт loggedIn родительского App как true,
              this.props.history.push('/');
            })
          }  
        })
        .catch(err => console.log(err));
      }
      render() {
          return(
              <PopupWithForm
                name="login"
                title="Вход"
                buttonText="Войти"
                buttonSecondText=""
                isOpen={true}
                onSubmit={this.handleSubmit}
              >
                <div className="popup__input-container">
                    <input type="email"
                        value={this.state.email}
                        onChange={this.handleChange}
                        className="popup__input popup__input_el_email"
                        id="email-input"
                        name="email" 
                        placeholder="Email" 
                        required />
                    <span className="popup__error email-input-error"></span>
                    <input type="text"
                        value={this.state.password}
                        onChange={this.handleChange}
                        className="popup__input popup__input_el_password"
                        id="password-input"
                        name="password" 
                        placeholder="Пароль" 
                        required 
                        minLength="2" 
                        maxLength="40" />
                    <span className="popup__error password-input-error"></span>
                </div>
              </PopupWithForm>
          )
      }
}

export default Login;
