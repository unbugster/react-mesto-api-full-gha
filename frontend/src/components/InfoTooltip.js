import successIcon from "../images/popup_success.svg";
import errorIcon from "../images/popup_error.svg";

function InfoTooltip({ isOpen, onClose, error }) {

  return (
    <div className={`popup popup_type_infoTooltip ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <img
          className="popup__infotooltip-img"
          src={error ? errorIcon : successIcon}
          alt="Иконка регистрации"
        />
        <h2 className="popup__infotooltip-title">{error
          ? "Что-то пошло не так! Попробуйте ещё раз."
          : "Вы успешно зарегистрировались!"}</h2>
        <button onClick={onClose} type="button" className="popup__close-btn" aria-label="Закрыть попап" />
      </div>
    </div>
  );
}

export default InfoTooltip;