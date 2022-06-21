import React from "react";
import Card from "./Card";
import {CurrentUserContext} from '../contexts/CurrentUserContext'

class Main extends React.Component {
  static contextType = CurrentUserContext;
  constructor(props) {
    super(props);
  }

  render(){
    return(
      <div className="content">
        <section className="profile">
          <div className="profile__avatar-container">
          <button className="profile__avatar-button" type="button" onClick={this.props.onEditAvatar}></button>
            <img className="profile__avatar" src={this.context?.avatar} alt="Аватарка" />
          </div>
          <div className="profile__info">
            <h1 className="profile__info-name">{this.context?.name}</h1>
            <button className="profile__edit-button" type="button" onClick={this.props.onEditProfile}></button>
            <p className="profile__info-job">{this.context?.about}</p>
          </div>
          <button className="profile__add-button" type="button" onClick={this.props.onAddPlace}></button>
        </section>
        <section className="elements">
        {this.props?.cards.map((card, _id) => (
              <Card 
                key = {card._id}
                id = {card._id}
                name = {card.name}
                link = {card.link}
                ownerId = {card.owner._id}
                likes = {card.likes}
                handleCardClick = {this.props.handleCardClick}
                onCardDelete = {this.props.handleCardDelete}
                onCardLike = {this.props.handleCardLike}
            />
          )
        )}
        </section>
      </div>      
    )
  }
}

export default Main;