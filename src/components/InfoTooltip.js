import React from 'react';
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
            <div className={`popup ${this.props.isOpen ? 'popup_opened' : '' } popup_type_infotooltip` }>
                <div className='popup__container-infotooltip'>
                  <button className="popup__close-button" type="button" onClick={this.props.onClose}></button>
                  <div>
                    <img className="popup__infotooltip-image" src={this.getImage()} alt="Подсказка"/>
                    <p className="popup__form-title_infotooltip">{this.getTitle()}</p>
                  </div>
                </div>
            </div>
        )
    }
}
export default InfoTooltip;