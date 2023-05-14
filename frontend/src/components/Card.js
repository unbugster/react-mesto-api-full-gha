import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { useContext } from "react";

const Card = ({ card, onCardClick, onCardLike, onCardDelete }) => {
  const { currentUser } = useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = (
    `gallery__like-btn ${isLiked && 'gallery__like-btn_active'}`
  );

  const handleLikeClick = (card) => {
    onCardLike(card);
  };

  const handleDeleteClick = (card) => {
    onCardDelete(card);
  };

  return (
    <li className="gallery__item" >
      <img onClick={() => onCardClick(card)} className="gallery__img" src={card.link} alt={card.name} />
      <div className="gallery__info">
        <p className="gallery__title">{card.name}</p>
        <div className="gallery__likes-wrapper">
          <button className={cardLikeButtonClassName} onClick={() => handleLikeClick(card)} type="button"></button>
          <p className="gallery__like-counter">{card.likes.length}</p>
        </div>
      </div>
      {isOwn && <button className="gallery__remove-btn" onClick={() => handleDeleteClick(card)} type="button"></button>}
    </li >
  )
};

export { Card };