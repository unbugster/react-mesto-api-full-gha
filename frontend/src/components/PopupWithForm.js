const PopupWithForm = ({ title, name, buttonText, isOpen, onClose, children, onSubmit, isLoading, isValid }) => {

  return (
    <div className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <h2 className="popup__title">{title}</h2>
        <form className="popup__form" name={name} onSubmit={onSubmit} noValidate>
          {children}
          <button className="popup__save-btn" type="submit" disabled={!isValid} >{isLoading ? "Сохранение..." : buttonText}</button>
        </form>
        <button onClick={onClose} type="button" className="popup__close-btn" aria-label="Закрыть попап" />
      </div>
    </div>
  );
};

export default PopupWithForm;
