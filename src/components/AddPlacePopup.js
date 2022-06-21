import React from "react";
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {
    const [name, setName] = React.useState('');
    const [link, setLink] = React.useState('');

    let handleInputName = (e) => {
        setName(e.target.value)
    }

    let handleInputLink = (e) => {
        setLink(e.target.value)
    }

    let submit = (event) =>{
        event.preventDefault();
        props.onAddCard(name, link);
        setName(' ');
        setLink(' ');
        props.onClose();
    }

    return (
        <PopupWithForm
          name="card"
          title="Новое место"
          buttonText="Сохранить"
          buttonSecondText="Сохранение..."  
          isOpen={props.isOpen}
          onClose={props.onClose}
          submit={submit}
          >  
            <div className="popup__input-container">
              <input
               value={name||''}
               onChange={handleInputName}
               type="text" 
               className="popup__input popup__input_card-name"
               id="card-name-input" 
               name="card-name" placeholder = "Название" required/>
              <span className="popup__error card-name-input-error"></span>
              <input
               value={link||' '}
               onChange={handleInputLink}
               type="url"
               className="popup__input popup__input_card-image"
               id="link-input" name="link"
               placeholder ="Ссылка на картинку" required/>
              <span className="popup__error link-input-error"></span>
            </div>
        </PopupWithForm>
    )
}

export default AddPlacePopup;