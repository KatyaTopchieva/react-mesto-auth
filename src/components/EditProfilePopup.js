import React from "react";
import PopupWithForm from './PopupWithForm';
import {CurrentUserContext} from '../contexts/CurrentUserContext'
import { api } from "../utils/api";

function EditProfilePopup(props) {

    const currentUser = React.useContext(CurrentUserContext);

    React.useEffect(() => {
        setName(currentUser?.name);
        setDescription(currentUser?.about);
      }, [currentUser, props.isOpen]); 

  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  let handleInputName = (e) => {
      setName(e.target.value)
  }

  let handleInputDescription = (e) => {
      setDescription(e.target.value)
  }
 
  let submit = (event) =>{
      event.preventDefault();
      props.onUpdateUser(name, description)
      setName(' ');
      setDescription(' ');
      props.onClose();
  }

  return (
    <PopupWithForm
        name="profile"
        title="Редактировать профиль"
        buttonText="Сохранить"
        buttonSecondText="Сохранение..."  
        isOpen={props.isOpen}
        onClose={props.onClose}
        submit={submit}
        >
            <div className="popup__input-container">
                <input type="text"
                    value={name||' '}
                    onChange={handleInputName}
                    className="popup__input popup__input_el_name"
                    id="username-input"
                    name="name" 
                    placeholder="Имя" 
                    required 
                    minLength="2" 
                    maxLength="40" />
                <span className="popup__error username-input-error"></span>
                <input
                    value={description||' '}
                    onChange={handleInputDescription}
                    type="text" className="popup__input popup__input_el_about-me"
                    id="about-me-input" name="description"
                    placeholder ="О себе"
                    required minLength="2"
                    maxLength="200" />
                <span className="popup__error about-me-input-error"></span>
            </div>
    </PopupWithForm>
  );
}

export default EditProfilePopup;