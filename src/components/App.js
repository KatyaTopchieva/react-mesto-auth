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
import * as auth from '../auth';
import ProtectedRoute from "./ProtectedRoute";
import { withRouter } from 'react-router-dom';
import InfoTooltip from './InfoTooltip';

class App extends React.Component{
  
  constructor(props){
    super(props);

    this.state = {
      isEditProfilePopupOpen: false,
      isAddPlacePopupOpen: false,
      isEditAvatarPopupOpen: false,
      isTooltipPopupOpen: false,
      currentUser: null,
      cards: [],
      isRegister: false,
      loggedIn: false,
      email: '',
      signPath: '',
      signLable: ''
    }

    this.handleLogin = this.handleLogin.bind(this);
    this.handleTokenCheck = this.handleTokenCheck.bind(this);
  }

  setUpRegistration = (password, email) => {
    auth.register(password, email)
        .then((res) => {
          if( !res.error && res.data){
            this.handleInfoTooltipPopupOpen(true);
            this.props.history.push('/sign-in');            
          }
          else{
            this.handleInfoTooltipPopupOpen(false);
          }
        })
        .catch(e => {
          console.log(e)
        }); 
  }

  authorize = (email, password, finish) => {
    auth.authorize(email, password)
      .then((data) => {
        finish(data);
      })
      .catch(e => {
        console.log(e)
      }); 
  }

  handleLogin = () => {
    const email = localStorage.getItem('email');
    this.setState({
      loggedIn: true,
      email: email
    })
    this.loadData();
  }

  handleRegister(success) {
    this.setState({
      isRegister: success
    })
  }

  handleTokenCheck = () => {
    if (localStorage.getItem('token')){
    const jwt = localStorage.getItem('token');
    // проверяем токен пользователя
    return auth.checkToken(jwt)
    .then((res) => {
      if (res){
        this.loadData();
        this.setState({
          loggedIn: true,
          email: localStorage.getItem('email')
        }, () => {
          this.props.history.push("/");
        });
      }
    })
    .then((data) => data)
    .catch(e => {
      console.log(e)
    }); 
   }
  }

handleRouteLogin = () => {
  this.setState({
    signLable: 'Регистрация',
    signPath: '/sign-up'
  })
}

handleRouteRegister = () => {
  this.setState({
    signLable: 'Вход',
    signPath: '/sign-in'
  })
}

handleRouteExit = () => {
  this.setState({
    signLable: 'Выйти',
    signPath: '/sign-in'
  })
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
    } else {
        api.addLike(id)
          .catch((err)=>{
            console.log(err);
          })  
        card.likes.push(this.context);        
    }
  }

  handleUpdateUser = (name, about, finish) => {
    api.editProfile(name, about)
      .then(value => {
        this.setState( {currentUser: value} );
        finish();
      })
      .catch((err)=>{
        console.log(err);
      })  
  }

  handleRefreshUser = (value) => {
      this.setState( {currentUser: value} );
  }

  handleUpdateAvatar = (avatar, finish) => {

    api.editAvatar(avatar)
      .then(value => {
        this.setState( {currentUser: value} );
        finish();
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

handleInfoTooltipPopupOpen = (isRegisterSuccess) => {
  this.setState({isTooltipPopupOpen: true, isRegisterSuccess: isRegisterSuccess});
}

handleCardClick = (selectedCard) => {
  this.setState({selectedCard: selectedCard});
}
  
closeAllPopups = () => {
  this.setState({isEditAvatarPopupOpen: false});
  this.setState({isEditProfilePopupOpen: false});
  this.setState({isAddPlacePopupOpen: false});
  this.setState({selectedCard: null});
  this.setState({isTooltipPopupOpen: false});
}

componentDidMount() {
  this.handleTokenCheck()
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

handleExit = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('email');
  this.setState({
    loggedIn: false,
    email: ''
  })
}

handlerAddCard = (name, link, finish) =>{

 api.addCard(name, link)
    .then((newCard) => {
        this.setCards([newCard, ...this.state.cards]); 
        finish();
    })
    .catch((err)=>{
        console.log(err);
    })
}

render() {
  return (
    <CurrentUserContext.Provider value={this.state.currentUser}>
      <div className="App page">
      <Header 
      loggedIn={this.state.loggedIn}
      onExit={this.handleExit}
      email={this.state.email}
      signPath={this.state.signPath}
      signLable={this.state.signLable}
      />
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
            handleButton={this.handleRouteExit}
          >
            <Main />
            
          </ProtectedRoute>
          <Route path="/sign-up">
            <Register
            handleRegister={this.handleRegister}
            handleButton={this.handleRouteRegister}            
            onClose={this.closeAllPopups}
            setUpRegistration={this.setUpRegistration}
            />
          </Route>
          <Route path="/sign-in">
            <Login 
            handleLogin={this.handleLogin}
            authorize={this.authorize}
            handleButton={this.handleRouteLogin}
            />
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
          isOpen={false}
          onClose={this.closeAllPopups}>
        </PopupWithForm>
        <ImagePopup
          card={this.state.selectedCard} 
          onClose={this.closeAllPopups}/>
        <InfoTooltip 
          isOpen={this.state.isTooltipPopupOpen}
          onClose={this.closeAllPopups}
          isRegisterSuccess={this.state.isRegisterSuccess}
        />
        <Footer />
        </div>    
    </CurrentUserContext.Provider>
  );
 }
}

export default withRouter(App);