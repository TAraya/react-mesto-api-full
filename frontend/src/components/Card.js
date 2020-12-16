import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import likeIcon from '../images/like_icon.svg';
import likedIcon from '../images/liked_icon.svg';
import removeIcon from '../images/remove_icon.svg';

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);

  function handleCardClick() {
    props.onCardClick(props.data);
  }

  function handleLikeClick() {
    props.onLikeClick(props.data);
  }

  function handleDeleteClick() {
    props.onDeleteClick(props.data);
  }

  const isOwn = props.data.owner === currentUser._id;
  const isLiked = props.data.likes.some(like => like === currentUser._id);

  return (
    <li className="card">
      <button
        className={`card__remove-button${isOwn ? '' : ' card__remove-button_inactive'}`}
        onClick={handleDeleteClick}
      >
        <img src={removeIcon} alt="Удалить"/>
      </button>
      <div className="card__photo-container">
        <img className="card__photo" src={props.data.link} alt="Фотография" onClick={handleCardClick}/>
      </div>
      <div className="card__caption">
        <h2 className="card__title">{props.data.name}</h2>
        <div className="card__like-container">
          <button className="card__like-button" onClick={handleLikeClick} type="button">
            <img className="card__unliked-icon" src={likeIcon} alt="Мне нравится"/>
            <img
              className={`card__liked-icon${isLiked ? '' : ' card__liked-icon_inactive'}`}
              src={likedIcon}
              alt="Мне нравится"
            />
          </button>
          <p className="card__like-counter">{props.data.likes.length}</p>
        </div>
      </div>
    </li>);
}

export default Card;