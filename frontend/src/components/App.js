import React from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import AddPlacePopup from './AddPlacePopup.js';
import DeleteCardPopup from './DeleteCardPopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import EditProfilePopup from './EditProfilePopup.js';
import Footer from './Footer.js';
import Header from './Header.js';
import ImagePopup from './ImagePopup.js';
import InfoTooltip from './InfoTooltip.js';
import Login from './Login.js';
import Main from './Main.js';
import ProtectedRoute from './ProtectedRoute.js';
import Register from './Register.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import { api, findToken, storeToken, removeToken } from '../utils/utils.js';

function App() {
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [tooltipState, setTooltipState] = React.useState({ isOpened: false });
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [isEditProfilePopupOpened, setEditProfilePopupOpened] = React.useState(false);
  const [isEditAvatarPopupOpened, setEditAvatarPopupOpened] = React.useState(false);
  const [isAddPlacePopupOpened, setAddPlacePopupOpened] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [deletedCard, setDeletedCard] = React.useState({});

  const history = useHistory();

  React.useEffect(() => {
    authorizeOnStartup();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function loadCards() {
    const token = findToken();
    api.getCards(token)
      .then(response => {
        setCards(response.data)
      })
      .catch(error => console.log(
        'Ошибка при получении данных с сервера: ' + JSON.stringify(error)));
  }

  function authorizeOnStartup() {
    const token = findToken();
    if (token) {
      api.getUser(token)
        .then(response => {
          setLoggedIn(true);
          setCurrentUser(response.data);
          loadCards();
          history.push("/");
        })
        .catch(error => {
          console.log(
            'Ошибка при проверке текущего пользователя: ' + JSON.stringify(error))
        });
    }
  }

  function editProfile() {
    setEditProfilePopupOpened(!isEditProfilePopupOpened);
  }

  function handleUpdateUser(user) {
    const token = findToken();
    api.updateUser(user, token)
      .then(response => {
        setCurrentUser(response.data);
        closeAllPopups();
      })
      .catch(error => console.log('Ошибка обновления данных пользователя: ' + error));
  }

  function addPlace() {
    setAddPlacePopupOpened(!isAddPlacePopupOpened);
  }

  function handleAddPlace(card) {
    const token = findToken();
    api.createCard(card, token)
      .then(response => {
        setCards([response.data, ...cards]);
        closeAllPopups();
      })
      .catch(error => console.log('Ошибка добавления места: ' + error));
  }

  function editAvatar() {
    setEditAvatarPopupOpened(!isEditAvatarPopupOpened);
  }

  function handleUpdateAvatar(avatar) {
    const token = findToken();
    api.updateAvatar(token)
      .then(response => {
        setCurrentUser(response.data);
        closeAllPopups();
      })
      .catch(error => console.log('Ошибка обновления аватара пользователя: ' + error));
  }

  function showPhoto(card) {
    setSelectedCard(card);
  }

  function handleCardLike(card) {
    const token = findToken();
    const isLiked = card.likes.some(i => i === currentUser._id);
    if (!isLiked) {
      api.likeCard(card._id, token)
        .then((response) => {
          const newCards = cards.map((c) => c._id === card._id ? response.data : c);
          setCards(newCards);
        })
        .catch(error => console.log('Ошибка при простановке лайка для карточки: ' + error));
    } else {
      api.unlikeCard(card._id, token)
        .then((response) => {
          const newCards = cards.map((c) => c._id === card._id ? response.data : c);
          setCards(newCards);
        })
        .catch(error => console.log('Ошибка при снятии лайка для карточки: ' + error));
    }
  }

  function deleteCard(card) {
    setDeletedCard(card);
  }

  function handleCardDelete(card) {
    const token = findToken();
    api.removeCard(card._id, token)
      .then(() => {
        setCards(cards.filter(oldCard => oldCard._id !== card._id));
        closeAllPopups();
      })
      .catch(error => console.log('Ошибка удаления карточки: ' + error));
  }

  function closeAllPopups() {
    setEditProfilePopupOpened(false);
    setEditAvatarPopupOpened(false);
    setAddPlacePopupOpened(false);
    setSelectedCard({});
    setDeletedCard({});
  }

  function handleLogin({ email, password }) {
    api.signIn({ email, password })
      .then(data => {
        storeToken(data.token);
        setLoggedIn(true);

        return api.getUser(data.token);
      })
      .then(response => {
        setCurrentUser(response.data);
        loadCards();
        history.push("/");
      })
      .catch(error => {
        setTooltipState({
          isOpened: true,
          message: 'Что-то пошло не так! Попробуйте ещё раз.',
          icon: 'Error'
        });
        console.log('Ошибка при аутентификации: ' + JSON.stringify(error));
      });
  }

  function handleLogout() {
    if (loggedIn) {
      setLoggedIn(false);
      removeToken();
    }
  }

  function handleRegister({ email, password }) {
    api.signUp({ email, password })
      .then(_ => {
        setTooltipState({
          isOpened: true,
          message: 'Вы успешно зарегистрировались!',
          icon: 'OK'
        });
        history.push("/sign-in");
      })
      .catch(error => {
        setTooltipState({
          isOpened: true,
          message: 'Что-то пошло не так! Попробуйте ещё раз.',
          icon: 'Error'
        });
        console.log('Ошибка при аутентификации: ' + JSON.stringify(error));
      });
  }

  function handleTooltipClose() {
    setTooltipState({ isOpened: false })
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Switch>
          <Route path="/sign-in">
            <Header loggedIn={loggedIn} link="Зарегистрироваться" linkPath="/sign-up" />
            <Login onLogin={handleLogin} />
            <InfoTooltip
              isOpened={tooltipState.isOpened}
              message={tooltipState.message}
              icon={tooltipState.icon}
              onClose={handleTooltipClose}
            />
          </Route>
          <Route path="/sign-up">
            <Header loggedIn={loggedIn} link="Войти" linkPath="/sign-in" />
            <Register onRegister={handleRegister} />
            <InfoTooltip
              isOpened={tooltipState.isOpened}
              message={tooltipState.message}
              icon={tooltipState.icon}
              onClose={handleTooltipClose}
            />
          </Route>
          <ProtectedRoute path="/" redirect="/sign-in" loggedIn={loggedIn}>
            <Header loggedIn={loggedIn} login={currentUser.email} onLogout={handleLogout} />
            <Main
              cards={cards}
              onEditProfile={editProfile}
              onAddPlace={addPlace}
              onEditAvatar={editAvatar}
              onCardClick={showPhoto}
              onCardLike={handleCardLike}
              onCardDelete={deleteCard}
            />
            <Footer />
            <EditProfilePopup
              isOpened={isEditProfilePopupOpened}
              onClose={closeAllPopups}
              onUpdateUser={handleUpdateUser}
            />
            <EditAvatarPopup
              isOpened={isEditAvatarPopupOpened}
              onClose={closeAllPopups}
              onUpdateAvatar={handleUpdateAvatar}
            />
            <AddPlacePopup isOpened={isAddPlacePopupOpened} onClose={closeAllPopups} onAddPlace={handleAddPlace} />
            <DeleteCardPopup card={deletedCard} onClose={closeAllPopups} onDeleteCard={handleCardDelete} />
            <ImagePopup card={selectedCard} onClose={closeAllPopups} />
          </ProtectedRoute>
        </Switch>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
