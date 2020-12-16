import React from 'react';
import PopupWithForm from './PopupWithForm.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function EditAvatarPopup(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const avatarInputRef = React.useRef();

  React.useEffect(() => {
    avatarInputRef.current.value = currentUser.avatar;
  }, [currentUser]);

  function handleSubmit(e) {
    e.preventDefault();
  
    props.onUpdateAvatar({
      avatar: avatarInputRef.current.value
    });
  }

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      isOpened={props.isOpened}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        id="avatar-input"
        ref={avatarInputRef}
        name="avatar"
        className="avatar-input form__input"
        type="url"
        placeholder="Ссылка на картинку"
        required
      />
      <p id="avatar-input-error" className="form__input-error"></p>          
    </PopupWithForm>
  );
}

export default EditAvatarPopup;