import React from "react";

class PopupWithForm extends React.Component {

  constructor(props){
    super(props);
  }

  render(){
        return (
        <div className={`popup ${this.props.isOpen ? 'popup_opened' : '' } popup_type_${this.props.name}` }>
        <div className="popup__container">
         <button className={`popup__close-button popup__close-button_${this.props.name}`} type="button" onClick={this.props.onClose}></button>
          <form className={`popup__form popup__form_${this.props.name}`} name={this.props.name} >
            <h2 className={`popup__form-title popup__form-title_${this.props.name}`}>{this.props.title}</h2>
            <fieldset className="popup__fieldset">
              {this.props.children}
              <div className="popup__button-container">
                <button className={`popup__button popup__button_${this.props.name}`} type="submit" onClick={this.props.submit}>
                  {this.props.buttonText}
                </button>
                <button className="popup__button popup__button_condition_saving"
                 type="submit">{this.props.buttonSecondText}</button>
              </div>
            </fieldset>
          </form>
        </div>
      </div>      
    )
  }
}

export default PopupWithForm;
