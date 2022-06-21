import React from "react";
import {CurrentUserContext} from '../contexts/CurrentUserContext';

class Card extends React.Component {
    static contextType = CurrentUserContext;
    constructor(props) {
        super(props);

        this.state = {
            isLiked: '', 
            likesCount: this.props.likes.length
        }
    }

    componentDidMount(){
        const isLiked = this.props.likes.some(i => i._id === this.context._id)
        this.setState({isLiked: isLiked});
    }

    showImage = ()=>{
        this.props.handleCardClick({link: this.props.link, name: this.props.name});
    }

    isOwn = () => {
        return this.props.ownerId === this.context._id;
    }

    setLike = () => {

        this.props.onCardLike(this.props.id, this.state.isLiked);

        if(this.state.isLiked){
            this.setState({isLiked: false, likesCount: this.state.likesCount - 1});
        }else
        {
            this.setState({isLiked: true, likesCount: this.state.likesCount + 1});
        }
    }

    handleDeleteClick = () => {
       this.props.onCardDelete(this.props.id);
    }

    render() {
        return(
            <div className="elements__card">
                <img className="elements__image" src={this.props.link} onClick={this.showImage} alt={this.props.name} />
                <button className={`elements__del ${this.isOwn()? 'elements__del_visible':''}`} onClick={this.handleDeleteClick} type="button"></button>
                <div className="elements__card-name">
                    <h2 className="elements__name">{this.props.name}</h2>
                    <div className="elements__like-container">
                    <button className=
                     {`elements__button-like ${this.state.isLiked? 'elements__button-like_active':''}`} 
                      onClick={this.setLike} type="button"></button>
                    <span className="elements__like-count">{this.state.likesCount}</span>
                    </div>
                </div>
            </div>       
        )
    };
}

export default Card;