import { Card } from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { useContext } from "react";

const Main = (
  { cards,
    onEditProfile,
    onAddPlace,
    onEditAvatar,
    onCardClick,
    onCardLike,
    onCardDelete
  }) => {
  const { currentUser } = useContext(CurrentUserContext);

  return (
    <main className="main">

      <section className="profile main__profile container" aria-label="Информация о пользователе">
        <div className="profile__avatar-container" onClick={onEditAvatar}>
          <img className="profile__img" src={currentUser.avatar} alt="Аватар пользователя" />
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <button className="profile__edit-btn" type="button" onClick={onEditProfile}></button>
          <p className="profile__activity">{currentUser.about}</p>
        </div>
        <button className="profile__add-btn" type="button" onClick={onAddPlace}>
          <span className="profile__cross"></span>
        </button>
      </section>

      <section className="gallery main__gallery container" aria-label="Фотогалерея">
        <ul className="gallery__list">
          {cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          ))}
        </ul>
      </section>
    </main>
  )
};

export default Main;