import { useContext, useEffect } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import PopupWithForm from './PopupWithForm';
import useFormAndValidation from '../hooks/useFormAndValidation';

const EditProfilePopup = ({ isOpen, onClose, onUpdateUser, isLoading }) => {
  const { currentUser } = useContext(CurrentUserContext);
  const { values, errors, isValid, handleChange, setIsValid, setValues, resetForm } = useFormAndValidation();

  useEffect(() => {
    if (currentUser) {
      setValues(currentUser);
      setIsValid(true);
    }

    if (!isOpen) {
      resetForm();
    }
  }, [currentUser, isOpen, setIsValid, resetForm, setValues]);

  const handleSubmit = (e) => {
    e.preventDefault();

    onUpdateUser({
      name: values.name,
      about: values.about,
    });
  };

  const userNameErrorClassName = (
    `popup__input-error user-name-input-error ${!isValid && "popup__input-error_visible"}`
  );

  const userActivityErrorClassName = (
    `popup__input-error activity-input-error ${!isValid && "popup__input-error_visible"}`
  );

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="profile-info"
      buttonText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      isLoading={isLoading}
      onSubmit={handleSubmit}
      isValid={isValid}
    >
      <input
        id="user-name-input"
        className="popup__input popup__input_info_name"
        name="name"
        value={values.name || ""}
        onChange={handleChange}
        type="text"
        placeholder="Имя"
        minLength="2"
        maxLength="40"
        required />
      <span className={userNameErrorClassName}>
        {errors.name}
      </span>
      <input
        id="activity-input"
        className="popup__input popup__input_info_activity"
        name="about" type="text" placeholder="Деятельность"
        value={values.about || ""}
        onChange={handleChange}
        minLength="2"
        maxLength="200"
        required />
      <span className={userActivityErrorClassName}>
        {errors.about}
      </span>
    </PopupWithForm>
  );
};

export default EditProfilePopup;