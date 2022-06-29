import React from 'react';
import PopupWithForm from './PopupWithForm';
import './styles/InfoTooltip.css';
import success from '../images/success.png';
import failed from '../images/failed.png';

class InfoTooltip extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            image: ''
        }
    }

    componentDidMount(){
        if(this.props.isRegisterSuccess){
            this.setState({
                title: "Вы успешно зарегистрировались!",
                image: {success}
            })
        }else
        {
            this.setState({
                title: "Что-то пошло не так!\r\n Попробуйте ещё раз.",
                image: {failed}
            })
        }
    }

    render() {
         return (
            <PopupWithForm
                name="infotooltip"
                title={this.state.title}
                buttonText=""
                buttonSecondText=""
                isOpen={this.props.isOpen}
                submit={this.handleSubmit}
              >
                  
                      <img src={this.state.image} alt="Подсказка"/> 
                  
              </PopupWithForm>
        )
    }
}
export default InfoTooltip;