import React from "react";
import api from "../utils/Api";
import Card from "./Card";

function Main(props) {
  const [userName, setUserName] = React.useState('');
  const [userDescription, setUserDescription] = React.useState('');
  const [userAvatar, setUserAvatar] = React.useState('');

  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    api.getUserInfo().then((res) => {
      setUserName(res.name);
      setUserDescription(res.about); setUserAvatar(res.avatar)
    }).catch((err) =>
      console.log(`Получение информации о пользователе привело к ошибке ${err}`)
    );

    api.getInitialCards().then((res) => {
      setCards(res);
    }).catch((err) =>
      console.log(`Получение информации о дефолтных карточках привело к ошибке ${err}`));
  }, []);

  return (
    <main>
      <section className="profile">
        <div className="profile__avatar-container">
          <img className="profile__avatar" src={userAvatar} alt="Аватарка профиля" />
          <button className="profile__avatar-edit-btn" type="button" onClick={props.onEditAvatar} />
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{userName}</h1>
          <button className="profile__edit-btn" type="button" onClick={props.onEditProfile} />
          <p className="profile__caption">{userDescription}</p>
        </div>
        <button className="profile__add-btn" type="button" onClick={props.onAddPlace} />
      </section>
      <section className="elements">
        {cards.map((cardItem, i) => (
          <Card card={cardItem} key = {cardItem._id} onCardClick = {props.onCardClick}/>))}
      </section>
    </main>
  );

}

export default Main;