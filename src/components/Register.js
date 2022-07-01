import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import * as auth from '../auth.js';
import PopupWithForm from './PopupWithForm';
import './styles/Register.css';

class Register extends React.Component {
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
  handleChange = (e) => {
    const {name, value} = e.target;
    this.setState({
      [name]: value
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    if (this.state.password){
        this.props.setUpRegistration(this.state.password, this.state.email);
      }
  }
  render() {
    return(
      <div className= "register">
        <PopupWithForm
          name="register"
          title="Регистрация"
          buttonText="Зарегистрироваться"
          buttonSecondText=""
          isOpen={true}
          submit={this.handleSubmit}
        >
          <div className="popup__input-container popup__input-container_register">
              <input type="email"
                  value={this.state.email}
                  onChange={this.handleChange}
                  className="popup__input popup__input_el_email popup__input_register"
                  id="email-input"
                  name="email" 
                  placeholder="Email" 
                  required />
              <span className="popup__error email-input-error"></span>
              <input type="password"
                  value={this.state.password}
                  onChange={this.handleChange}
                  className="popup__input popup__input_el_password popup__input_register"
                  id="password-input"
                  name="password" 
                  placeholder="Пароль" 
                  required 
                  minLength="2" 
                  maxLength="40" />
              <span className="popup__error password-input-error"></span>
          </div>
        </PopupWithForm>
        <div className="register__signin">
            <p>Уже зарегистрированы?</p>
            <Link to="/sign-in" className="register__login-link">Войти</Link>
        </div>
      </div>
    )
  }
}

export default withRouter (Register);