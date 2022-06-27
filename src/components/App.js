import React, { useEffect, useState } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import '../index.css';
import Header from './Header';
import Main from './Main';
import PopupWithForm from './PopupWithForm';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { api } from '../utils/api.js';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup' 
import AddPlacePopup from './AddPlacePopup';
import Register from './Register';
import Login from './Login';
import * as auth from '../Auth.js';
import ProtectedRoute from "./ProtectedRoute";
import { withRouter } from 'react-router-dom';

class App extends React.Component{
  
  constructor(props){
    super(props);

    this.state = {
      isEditProfilePopupOpen: false,
      isAddPlacePopupOpen: false,
      isEditAvatarPopupOpen: false,
      currentUser: null,
      cards: [],
      isRegister: false,
      loggedIn: false
    }

    this.handleLogin = this.handleLogin.bind(this);
    this.handleTokenCheck = this.handleTokenCheck.bind(this);
  }

  handleLogin() {
    this.setState({
      loggedIn: true
    })
  }

  handleRegister() {
    this.setState({
      isRegister: true
    })
  }

  handleTokenCheck = () => {
    if (localStorage.getItem('token')){
    const jwt = localStorage.getItem('token');
    // проверяем токен пользователя
    return auth.checkToken(jwt)
    .then((res) => {
      if (res){
        this.setState({
          loggedIn: true
        }, () => {
          this.props.history.push("/");
        });
      }
    })
    .then((data) => data); 
   }
  }

  setCards(cards) {
    this.setState({
      cards: cards
    })
  }

  handleCardDelete = (id) => {
    api.deleteCard(id)
    .then(value => {
      const cards = this.state.cards.filter(x => x._id !== id);
      this.setCards(cards);
    })
    .catch((err)=>{
      console.log(err);
    })
  }

  handleCardLike = (id, isLiked) => {

    const card = this.state.cards.find(x => x._id === id);
    if(isLiked){
        api.deleteLike(id)
          .catch((err)=>{
            console.log(err);
          })
    }else
    {
        api.addLike(id)
          .catch((err)=>{
            console.log(err);
          })  
        card.likes.push(this.context);        
    }
  }

  handleUpdateUser = (name, about) => {
    api.editProfile(name, about)
    .then(value => {
      this.setState( {currentUser: value} );
        })
    .catch((err)=>{
        console.log(err);
    })
  }

  handleRefreshUser = (value) => {
      this.setState( {currentUser: value} );
  }

  handleUpdateAvatar = (avatar) => {

    api.editAvatar(avatar)
    .then(value => {
      this.setState( {currentUser: value} );
        })
    .catch((err)=>{
        console.log(err);
    })
  }
  
  handleEditAvatarClick = () => {
  this.setState({isEditAvatarPopupOpen: true});
}

 handleEditProfileClick = () => {
  this.setState({isEditProfilePopupOpen: true});
}

  handleAddPlaceClick = () => {
    this.setState({isAddPlacePopupOpen: true});
}

handleCardClick = (selectedCard) => {
  this.setState({selectedCard: selectedCard});
}
  
closeAllPopups = () => {
  this.setState({isEditAvatarPopupOpen: false});
  this.setState({isEditProfilePopupOpen: false});
  this.setState({isAddPlacePopupOpen: false});
  this.setState({selectedCard: null});
}

componentDidMount() {
  this.handleTokenCheck()
  .then(data =>{
    this.loadData();
  });
}

loadData() {
  Promise.all([
    api.getUserInfo(),
    api.getCard()
  ])
  .then((values) => {
        const res = values[0];
        const userId = res._id;
        this.handleRefreshUser(res); 
        const cards = values[1];
        this.setCards(cards);        
      })  
  .catch((err)=>{
    console.log(err);
  })

}

handlerAddCard = (name, link) =>{

  api.addCard(name, link)
    .then((newCard) => {
        this.setCards([newCard, ...this.state.cards]); 
    });  
}

render() {
  return (
    <CurrentUserContext.Provider value={this.state.currentUser}>
      <div className="App page">
      <Header />
      <Switch>
        <ProtectedRoute 
            exact path="/"
            loggedIn={this.state.loggedIn}
            component={Main}
            onEditAvatar={this.handleEditAvatarClick}
            onEditProfile={this.handleEditProfileClick}
            onAddPlace={this.handleAddPlaceClick}
            userName={this.state.userName}
            userDescription={this.state.userDescription}
            userAvatar={this.state.userAvatar}
            cards={this.state.cards}
            userId={this.state.userId}
            handleCardClick={this.handleCardClick}
            handleCardDelete={this.handleCardDelete}
            handleCardLike={this.handleCardLike}
          >
            <Main />
            <Footer />
          </ProtectedRoute>
          <Route path="/sign-up">
            <Register handleRegister={this.handleRegister} />
          </Route>
          <Route path="/sign-in">
            <Login handleLogin={this.handleLogin} />
          </Route>
          <Route exact path="/">
            {this.state.loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
          </Route>
        </Switch>
        <EditAvatarPopup 
              isOpen={this.state.isEditAvatarPopupOpen}
              onClose={this.closeAllPopups}
              onUpdateAvatar={this.handleUpdateAvatar}
              /> 
            <EditProfilePopup 
              isOpen={this.state.isEditProfilePopupOpen} 
              onClose={this.closeAllPopups}
              onUpdateUser={this.handleUpdateUser} />
            <AddPlacePopup 
              isOpen={this.state.isAddPlacePopupOpen} 
              onClose={this.closeAllPopups}
              onAddCard={this.handlerAddCard}
              />
            <PopupWithForm
              name="delete"
              title="Вы уверены?"
              buttonText="Да"
              buttonSecondText=" "  
              isOpen={false}
              onClose={this.closeAllPopups}>
            </PopupWithForm>
            <ImagePopup
              card={this.state.selectedCard} 
              onClose={this.closeAllPopups}/>
        </div>    
    </CurrentUserContext.Provider>
  );
 }
}

export default withRouter(App);
