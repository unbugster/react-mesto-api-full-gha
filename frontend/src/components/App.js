import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from 'react-router-dom';
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { api } from "../utils/api";
import { auth } from "../utils/auth";
import Main from "./Main";
import Header from "./Header";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ProtectedRoute from "./ProtectedRoute";
import Register from "./Register";
import Login from "./Login";
import InfoTooltip from "./InfoTooltip";

const App = () => {
  const [currentUser, setCurrentUser] = useState({});
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [regError, setRegError] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  const closeAllPopups = () => {
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setSelectedCard(null);
    setIsInfoTooltipOpen(false);
  };

  useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getUserInfo(), api.getInitialCards()])
        .then(([userData, cards]) => {
          setCurrentUser(userData);
          setCards(cards);
        })
        .catch((err) => {
          console.log("===Initial data error:", err);
        })
    }
  }, [loggedIn])

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth
        .checkToken(jwt)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            navigate("/", { replace: true });
            setEmail(res.data.email);
          }
        })
        .catch((err) => {
          console.log("===checkToken error:", err)
        });
    }
  }, [navigate]);

  const handleRegister = (values) => {
    if (!values.email || !values.password) {
      return;
    }
    auth
      .registration(values.email, values.password)
      .then((res) => {
        setRegError(false);
        navigate("/sign-in", { replace: true });
      })
      .catch((err) => {
        setRegError(true);
        console.log("===handleRegister error:", err);
      }).finally(() => {
        setIsInfoTooltipOpen((prev) => !prev);
      })
      ;
  };

  const handleLogin = (values) => {
    if (!values.email || !values.password) {
      return;
    }
    auth
      .authorize(values.email, values.password)
      .then((data) => {
        if (data.token) {
          setLoggedIn(true);
          localStorage.setItem("jwt", data.token);
          setEmail(values.email);
          navigate("/");
        }
      })
      .catch((err) => {
        setRegError(true);
        setIsInfoTooltipOpen((prev) => !prev);
        console.log("===handleLogin error:", err);
      });
  };

  const handleSignOut = () => {
    localStorage.removeItem("jwt");
    setEmail("");
  };

  const handleCardLike = (card) => {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => console.log('handleCardLike error:', err));
  };

  const handleCardDelete = (card) => {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((item) => item._id !== card._id));
      })
      .then(() => closeAllPopups())
      .catch((err) => console.log('handleCardDelete error:', err));
  };

  const handleEditProfileClick = () => {
    setEditProfilePopupOpen(!isEditProfilePopupOpen);
  };

  const handleAddPlaceClick = () => {
    setAddPlacePopupOpen(!isAddPlacePopupOpen);
  };

  const handleEditAvatarClick = () => {
    setEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  };

  const handleCardClick = (cardData) => {
    setSelectedCard(cardData);
  };

  const handleUpdateUser = (user) => {
    setIsLoading(true);
    api
      .editProfile(user)
      .then(({ name, about }) => {
        setCurrentUser({ ...currentUser, name, about });
        closeAllPopups();
      })
      .catch((err) => console.log('handleUpdateUser error:', err))
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleUpdateAvatar = (avatar) => {
    setIsLoading(true);
    api
      .setUserAvatar(avatar)
      .then(({ avatar }) => {
        setCurrentUser({ ...currentUser, avatar });
        closeAllPopups();
      })
      .catch((err) => console.log('handleUpdateAvatar error:', err))
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleAddPlaceSubmit = (card) => {
    setIsLoading(true);
    api
      .addNewCard(card)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log('handleAddPlaceSubmit error:', err))
      .finally(() => {
        setIsLoading(false);
      });
  };

  const isPopupOpen =
    isEditAvatarPopupOpen ||
    isEditProfilePopupOpen ||
    isAddPlacePopupOpen ||
    selectedCard ||
    isInfoTooltipOpen;

  useEffect(() => {
    const closeByEscape = (evt) => {
      if (evt.key === 'Escape') {
        closeAllPopups();
      }
    }
    const handleClickOverlay = (evt) => {
      if (evt.target.classList.contains("popup_opened") || evt.target === evt.currentTarget) {
        closeAllPopups();
      }
    };

    if (isPopupOpen) {
      document.addEventListener('keydown', closeByEscape);
      document.addEventListener('mousedown', handleClickOverlay);
      return () => {
        document.removeEventListener('keydown', closeByEscape);
        document.removeEventListener('mousedown', handleClickOverlay);
      }
    }
  }, [isPopupOpen])

  return (
    <div className="page">
      <CurrentUserContext.Provider value={{ currentUser }}>
        <Header email={email} onSignOut={handleSignOut} />

        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute
                element={Main}
                loggedIn={loggedIn}
                cards={cards}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
              />
            }
          />
          <Route
            path="/sign-up"
            element={<Register onRegister={handleRegister} />} />
          <Route
            path="/sign-in"
            element={
              <Login
                onLogin={handleLogin}
                setRegError={setRegError}
                setIsInfoTooltipOpen={setIsInfoTooltipOpen}
                setEmail={setEmail}
              />
            }
          />
        </Routes>


        <Footer />

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isLoading={isLoading}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          isLoading={isLoading}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isLoading={isLoading}
        />
        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          onClose={closeAllPopups}
          error={regError}
        />
        <PopupWithForm title="Вы уверены?" name="delete-card" buttonText="Да" />
      </CurrentUserContext.Provider>
    </div>
  );
};

export default App;
