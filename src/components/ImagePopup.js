function ImagePopup({ card, onClose }) {
  return card 
  ? (<div className='popup popup_opened' id="popup-image">
      < div className="popup__image-container" >
        <img
          className="popup__image-element"
          src={card.link}
          alt={card.name}
        />
        <h2 className="popup__image-title">{card.name}</h2>
        <button className="popup__close-btn" type="button" onClick={onClose} />
      </div >
    </div >)
    : null
}

export default ImagePopup;