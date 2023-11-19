import Header from './components/Header';
import React from 'react';
import Main from './components/Main';
import Footer from './components/Footer';
import PopupWithForm from './components/PopupWithForm';
import ImagePopup from './components/ImagePopup';
import { CurrentUserContext } from './contexts/CurrentUserContext';
import api from './utils/Api';
import EditProfilePopup from './components/EditProfilePopup';
import EditAvatarPopup from './components/EditAvatarPopup';
import AddPlacePopup from './components/AddPlacePopup';

function App() {
  const [currentUser, setCurrentUser] = React.useState({ name: '', about: '' });

  React.useEffect(() => {
    api.getUserInfo().then((res) => {
      setCurrentUser(res);
    }).catch((err) =>
      console.log(`Получение информации о пользователе привело к ошибке ${err}`)
    )
  }, []);

  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    api.getInitialCards().then((res) => {
      setCards(res);
    }).catch((err) =>
      console.log(`Получение информации о дефолтных карточках привело к ошибке ${err}`));
  }, []);

  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);

  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);

  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);

  const [selectedCard, setSelectedCard] = React.useState({});

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    });
  }

  function handleCardDelete(cardId) {
    api.deleteCard(cardId)
      .then((response) => setCards((state) => state.filter((c) => c._id !== cardId)));
  }

  function handleUpdateUser(userInfo) {
    api.setUserInfo(userInfo)
      .then((res) => setCurrentUser(res))
      .then((res) => closeAllPopups());
  }

  function handleUpdateAvatar(avatar) {
    api.setUserAvatar(avatar)
      .then((res) => setCurrentUser(res))
      .then((res) => closeAllPopups());
  }

  function handleAddPlaceSubmit(card) {
    api.addNewCard(card)
    .then((newCard) => setCards([newCard, ...cards]))
    .then((res) => closeAllPopups());
    }

  React.useEffect(() => {
    function handleEscClose(evt) {
      if (evt.key === 'Escape') {
        closeAllPopups();
      }
    }

    if (isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || selectedCard) {
      document.addEventListener('keydown', handleEscClose);
      return (() => document.removeEventListener('keydown', handleEscClose));
    }
    return () => { }
  }, [isEditAvatarPopupOpen, isEditProfilePopupOpen, isAddPlacePopupOpen, selectedCard])

  function closeAllPopups() {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setSelectedCard({});
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__container">
          <meta charSet="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Mesto</title>
          <meta
            name="description"
            content="Интерактивная страница с фотографиями мест для путешествий"
          />
          <meta name="keywords" content="Путешествия, фотографии" />
          <meta name="author" content="Валерия Юдина" />
          <Header />
          <Main cards={cards} onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick} onLikeClick={handleCardLike} onDeleteClick={handleCardDelete} />
          <Footer />
          <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
          <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddNewPlace={handleAddPlaceSubmit}/>
          {selectedCard.name && selectedCard.link ? (<ImagePopup card={selectedCard} onClose={closeAllPopups} />) : null}
          <PopupWithForm name='delete-card' title='Вы уверены?' buttonText="Да" buttonClass=" btnPopup-delete-card" />
          <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar} />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
