import React from 'react';
import PopupWithForm from './PopupWithForm.js';

function DeleteCardPopup(props) {
  function handleSubmit(e) {
    e.preventDefault();
  
    props.onDeleteCard(props.card);
  }

  return (
    <PopupWithForm
      name="card-remove"
      title="Вы уверены?"
      submitText="Да"
      isOpened={props.card._id}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    />
  );
}

export default DeleteCardPopup;