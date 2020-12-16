import React from 'react';
import PopupWithForm from './PopupWithForm.js';

function AddPlacePopup(props) {
  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleLinkChange(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
  
    props.onAddPlace({ name, link });
  }

  return (
    <PopupWithForm
      name="add-card"
      title="Новое место"
      isOpened={props.isOpened}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        id="card-name-input"
        name="name" 
        className="card-name-input form__input"
        value={name}
        placeholder="Название"
        required
        minLength="1"
        maxLength="30"
        onChange={handleNameChange}
      />
      <p id="card-name-input-error" className="form__input-error"></p>
      <input
        type="url" 
        id="card-link-input"
        name="link"
        className="card-link-input form__input"
        value={link}
        placeholder="Ссылка на картинку"
        required
        onChange={handleLinkChange}
      />
      <p id="card-link-input-error" className="form__input-error"></p>
    </PopupWithForm>
  );
}

export default AddPlacePopup;