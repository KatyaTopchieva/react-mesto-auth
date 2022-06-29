import React from 'react';
import PopupWithForm from './PopupWithForm';
import './styles/InfoTooltip.css';
import success from '../images/success.png';
import failed from '../images/failed.png';

class InfoTooltip extends React.Component {
    constructor(props) {
        super(props);

    }

    getTitle(){
        if(this.props.isRegisterSuccess){
            return "Вы успешно зарегистрировались!";
          }else
        {
            return "Что-то пошло не так!\r\n Попробуйте ещё раз.";
        }       
    }

    getImage(){
        if(this.props.isRegisterSuccess){
            return success;
          }else
        {
            return failed;
        }
    }

    render() {
         return (
            <PopupWithForm
                name="infotooltip"
                title={this.getTitle()}
                buttonText=""
                isOpen={this.props.isOpen}
                submit={this.handleSubmit}
                onClose={this.props.onClose}
              >    
                 <img className='popup__infotooltip-image' src={this.getImage()} alt="Подсказка"/>   
              </PopupWithForm>
        )
    }
}
export default InfoTooltip;