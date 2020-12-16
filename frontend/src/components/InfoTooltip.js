import React from 'react';
import closeIcon from '../images/close_icon.svg';
import errorIcon from '../images/error_icon.svg';
import successIcon from '../images/success_icon.svg';

function InfoTooltip(props) {
  return (
    <section className={`popup${props.isOpened ? ' popup_opened' : ''}`}>
    <div className="popup__container">
      <div className="tooltip">
        {(props.icon === 'OK') && <img className="tooltip__icon" src={successIcon} alt="OK"/> }
        {(props.icon === 'Error') && <img className="tooltip__icon" src={errorIcon} alt="Ошибка"/> }
        <p className="tooltip__message">{props.message}</p>
      </div>
      <button className="popup__close-button" onClick={props.onClose} type="button">
        <img src={closeIcon} alt="Закрыть"/>
      </button>
    </div>
  </section>
  );
}

export default InfoTooltip;