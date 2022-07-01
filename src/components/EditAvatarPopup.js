import React from "react";
import PopupWithForm from './PopupWithForm';
import {CurrentUserContext} from '../contexts/CurrentUserContext';

function EditAvatarPopup(props) {
    const currentUser = React.useContext(CurrentUserContext);

    const [avatar, setAvatar] = React.useState('');

      let handleInputAvatar = (e) => {
        setAvatar(e.target.value)
    }
        
    let finish = () => {
      setAvatar(' ');
      props.onClose();
    }

    let submit = (event) =>{
        event.preventDefault();
        props.onUpdateAvatar(avatar, finish)     
    }
       
return (
    <PopupWithForm
        name="avatar"
        title="Обновить аватар"
        buttonText="Сохранить"
        isOpen={props.isOpen}
        onClose={props.onClose}
        submit={submit}
        >
            <div className="popup__input-container">
              <input 
                value={avatar||' '}
                onChange={handleInputAvatar}
                type="url" 
                className="popup__input popup__input-edit-avatar"
                id="link-avatar-input" 
                name="linkAvatar" 
                placeholder ="Ссылка на аватар" required />
              <span className="popup__error link-avatar-input-error"></span>
            </div>
    </PopupWithForm>
)
}

export default EditAvatarPopup;