import React from 'react';
import closeIcon from '../images/close_icon.svg';

function ImagePopup(props) {
  return (
    <section className={`photo-popup popup${props.card.link ? ' popup_opened' : ''}`}>
    <div className="popup__container">
      <div className="photo">
        <img className="photo__image" src={props.card.link} alt="Фотография"/>
        <p className="photo__description">{props.card.name}</p>
      </div>
      <button className="popup__close-button" onClick={props.onClose} type="button">
        <img src={closeIcon} alt="Закрыть"/>
      </button>
    </div>
  </section>
  );
}

export default ImagePopup;