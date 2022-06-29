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
            <fieldset className={`popup__fieldset popup__fieldset_${this.props.name}`}>
              {this.props.children}
                <button className={`popup__button popup__button_${this.props.name}`} type="submit" onClick={this.props.submit}>
                  {this.props.buttonText}
                </button>
            </fieldset>
          </form>
        </div>
      </div>      
    )
  }
}

export default PopupWithForm;
