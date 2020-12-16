import React from 'react';
import Card from './Card.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import addIcon from '../images/add_icon.svg';
import editIcon from '../images/edit_icon.svg';

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main>
      <section className="profile">
        <div className="profile__container">
          <div className="profile__avatar-container">
            <img className="profile__avatar-edit-icon" src={editIcon} alt="Редактировать"/>
            <img className="profile__avatar" src={currentUser.avatar} onClick={props.onEditAvatar} alt="Аватар"/>
          </div>
          <div className="profile__info">
            <div className="profile__title">
              <h1 className="profile__name">{currentUser.name}</h1>
              <button className="profile__edit-button" onClick={props.onEditProfile} type="button">
                <img src={editIcon} alt="Редактировать"/>
              </button>
            </div>
            <p className="profile__job">{currentUser.about}</p>
          </div>
        </div>
        <button className="profile__add-card-button" onClick={props.onAddPlace} type="button">
            <img src={addIcon} alt="Добавить"/>
        </button>
      </section>
      <section className="gallery">
        <ul className="gallery__items">
          {props.cards.map(card => (
            <Card key={card._id} data={card}
              onCardClick={props.onCardClick}
              onLikeClick={props.onCardLike}
              onDeleteClick={props.onCardDelete}/>
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;