import React from 'react';
import PopupWithForm from './PopupWithForm.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function EditProfilePopup(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState(currentUser.name);
  const [description, setDescription] = React.useState(currentUser.about);

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
  
    props.onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      isOpened={props.isOpened}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        id="profile-name-input"
        className="profile-name-input form__input"
        name="name"
        type="text"
        value={name || ''}
        placeholder="Имя"
        required
        minLength="2"
        maxLength="40"
        onChange={handleNameChange}
      />
      <p id="profile-name-input-error" className="form__input-error"></p>
      <input
        id="profile-job-input"
        className="profile-job-input form__input"
        name="about"
        type="text"
        value={description || ''}
        placeholder="О себе"
        required
        minLength="2"
        maxLength="200"
        onChange={handleDescriptionChange}
      />
      <p id="profile-job-input-error" className="form__input-error"></p>    
    </PopupWithForm>
  );
}

export default EditProfilePopup;