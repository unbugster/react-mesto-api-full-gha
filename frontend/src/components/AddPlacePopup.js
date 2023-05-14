import PopupWithForm from './PopupWithForm';
import { useEffect } from 'react';
import useFormAndValidation from '../hooks/useFormAndValidation';

const AddPlacePopup = ({ isOpen, onClose, onAddPlace, isLoading }) => {
  const { values, errors, isValid, handleChange, resetForm } = useFormAndValidation();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isValid) {
      onAddPlace({
        name: values.cardName,
        link: values.cardLink,
      });
    }
  };

  useEffect(() => {
    if (!isOpen) {
      resetForm();
    }
  }, [isOpen, resetForm]);

  const nameErrorClassName = (
    `popup__input-error name-input-error ${!isValid && "popup__input-error_visible"}`
  );

  const cardLinkErrorClassName = (
    `popup__input-error card-link-input-error ${!isValid && "popup__input-error_visible"}`
  );

  return (
    <PopupWithForm
      title="Новое место"
      name="add-form"
      buttonText="Создать"
      isOpen={isOpen}
      onClose={onClose}
      isLoading={isLoading}
      onSubmit={handleSubmit}
      isValid={isValid}
    >
      <input
        id="name-input"
        className="popup__input popup__input_info_card-name"
        name="cardName"
        type="text"
        placeholder="Название"
        minLength="2"
        maxLength="30"
        value={values.cardName || ''}
        onChange={handleChange}
        required />
      <span className={nameErrorClassName}>{errors.cardName}</span>
      <input
        id="card-link-input"
        className="popup__input popup__input_info_card-link"
        name="cardLink"
        type="url"
        placeholder="Ссылка на картинку"
        autoComplete="off"
        value={values.cardLink || ''}
        onChange={handleChange}
        required />
      <span className={cardLinkErrorClassName}>{errors.cardLink}</span>
    </PopupWithForm>
  );
};

export default AddPlacePopup;