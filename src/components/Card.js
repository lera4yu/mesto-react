function Card({ card, onCardClick }) {
  function handleClick() {
    onCardClick(card);
  }

  return (
    <article className="element">
      <img className="element__image" src={card.link}
        alt={card.title} onClick={handleClick} />
      <div className="element__info">
        <h2 className="element__title">{card.name}</h2>
        <div className="element__like">
          <button className="element__like-btn" type="button" />
          {card.likes.length > 0
            ? <h3 className='element__like-count element__like-count_opened'>{card.likes.length}</h3>
            : null
          }
        </div>
      </div>
      <button className="element__trash-btn" type="button" />
    </article>
  )
}

export default Card;