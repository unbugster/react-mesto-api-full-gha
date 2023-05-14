import { useEffect, useRef } from 'react';
import PopupWithForm from './PopupWithForm';
import useFormAndValidation from '../hooks/useFormAndValidation';

const EditAvatarPopup = ({ isOpen, onClose, onUpdateAvatar, isLoading }) => {
  const avatarLink = useRef();
  const { values, handleChange, errors, isValid, resetForm } = useFormAndValidation();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isValid) {
      onUpdateAvatar({
        avatar: avatarLink.current.value,
      });
    }
  };

  useEffect(() => {
    if (!isOpen) {
      resetForm();
    }
  }, [isOpen, resetForm]);

  const avatarErrorClassName = (
    `popup__input-error avatar-link-input-error ${!isValid && "popup__input-error_visible"}`
  );

  return (
    <PopupWithForm
      title="Обновить аватар"
      name="update-avatar"
      buttonText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      isLoading={isLoading}
      onSubmit={handleSubmit}
      isValid={isValid}
    >
      <input
        id="avatar-link-input"
        className="popup__input popup__input_avatar_link"
        name="avatarLink"
        type="url"
        placeholder="Ссылка на картинку"
        autoComplete="off"
        ref={avatarLink}
        value={values.avatarLink || ''}
        onChange={handleChange}
        required />
      <span className={avatarErrorClassName}>{errors.avatarLink}</span>
    </PopupWithForm>
  );
};

export default EditAvatarPopup;