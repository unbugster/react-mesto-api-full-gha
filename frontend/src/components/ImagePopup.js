const ImagePopup = ({ card, onClose }) => {
  const popupImageClassName = (
    `popup popup_type_image ${card && "popup_opened"}`
  );

  return (
    <div className={popupImageClassName} id="img-card-popup">
      <div className="popup__card">
        <button onClick={onClose} className="popup__close-btn" type="button" aria-label="Закрыть попап"></button>
        <figure className="popup__figure">
          <img className="popup__img" src={card?.link} alt={card?.name} />
          <figcaption className="popup__caption">{card?.name}</figcaption>
        </figure>
      </div>
    </div>
  );
};

export default ImagePopup;