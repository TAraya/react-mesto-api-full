import React from 'react';
import closeIcon from '../images/close_icon.svg';

function PopupWithForm(props) {
  return (
    <section className={`popup popup_type_${props.name}${props.isOpened ? ' popup_opened' : ''}`}>
      <div className="popup__container">
        <form className="form" name={props.name} onSubmit={props.onSubmit} noValidate>
          <h2 className="form__header">{props.title}</h2>
          {props.children}
          <button className="form__submit" type="submit">
            {props.submitText || 'Сохранить'}
          </button>
        </form>
        <button className="popup__close-button" onClick={props.onClose} type="button">
          <img src={closeIcon} alt="Закрыть"/>
        </button>
      </div>
    </section>
  );
}

export default PopupWithForm;