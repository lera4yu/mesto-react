import Header from './components/Header';
import React from 'react';
import Main from './components/Main';
import Footer from './components/Footer';
import PopupWithForm from './components/PopupWithForm';
import ImagePopup from './components/ImagePopup';

function App() {
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  const [selectedCard, setSelectedCard] = React.useState();

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleEscClose(evt) {
    if (evt.key === 'Escape') {
      closeAllPopups();
    }
  }

  React.useEffect(() => {
    document.addEventListener('keydown', handleEscClose);
    return (() => document.removeEventListener('keydown', handleEscClose));
  })

  function closeAllPopups() {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setSelectedCard(undefined);
  }

  return (
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
        <Main onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} 
        onCardClick = {handleCardClick}/>
        <Footer />
        <PopupWithForm name='profile' title='Редактировать профиль' isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}>
          <input
            minLength={2}
            maxLength={40}
            type="text"
            placeholder="Имя"
            className="popup__text popup__text_type_name"
            name="namePopup"
            required=""
          />
          <span className="popup__error" id="namePopup-error" />
          <input
            minLength={2}
            maxLength={200}
            type="text"
            placeholder="О вас"
            className="popup__text popup__text_type_caption"
            name="captionPopup"
            required=""
          />
          <span className="popup__error" id="captionPopup-error" />
          <button
            type="submit"
            className="popup__submit-btn popup__submit-btn_disabled btnPopup-profile"
          >
            Сохранить
          </button>
        </PopupWithForm>
        <PopupWithForm name='card' title='Новое место' isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}>
          <input
            minLength={2}
            maxLength={30}
            type="text"
            placeholder="Название"
            className="popup__text popup__text_type_title-card"
            name="titlePopup"
            required=""
          />
          <span className="popup__error" id="titlePopup-error" />
          <input
            type="url"
            placeholder="Ссылка на картинку"
            className="popup__text popup__text_type_link-card"
            name="linkPopup"
            required=""
          />
          <span className="popup__error" id="linkPopup-error" />
          <button
            type="submit"
            className="popup__submit-btn popup__submit-btn_disabled btnPopup-card"
          >
            Создать
          </button>
        </PopupWithForm>
        <ImagePopup card = {selectedCard} onClose={closeAllPopups}/>
        <PopupWithForm name='delete-card' title='Вы уверены?'>
          <button
            type="submit"
            className="popup__submit-btn btnPopup-delete-card"
          >
            Да
          </button>
        </PopupWithForm>
        <PopupWithForm name='avatar' title='Обновить аватар' isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}>
          <input
            type="url"
            placeholder="Ссылка на картинку"
            className="popup__text popup__text_type_link-avatar"
            name="linkPopupAvatar"
            required=""
          />
          <span className="popup__error" id="linkPopupAvatar-error" />
          <button
            type="submit"
            className="popup__submit-btn popup__submit-btn_disabled btnPopup-avatar"
          >
            Сохранить
          </button>
        </PopupWithForm>
      </div>
    </div>
  );
}

export default App;
