import { Link } from "react-router-dom";
import useFormAndValidation from "../hooks/useFormAndValidation";

const Register = ({ onRegister }) => {
  const { values, handleChange, errors, isValid } = useFormAndValidation();

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister(values);
  }

  const formEmailClassName = (
    `popup__input-error identity-email__input-error ${!isValid && "popup__input-error_visible"}`
  );

  const formPasswordClassName = (
    `popup__input-error identity-password__input-error ${!isValid && "popup__input-error_visible"}`
  );

  return (
    <form
      onSubmit={handleSubmit}
      className="identity-form"
    >
      <h2 className="identity-form__title">Регистрация</h2>
      <input
        className="identity-form__input form__input_user_email"
        id="user-email-input"
        name="email"
        value={values.email || ""}
        onChange={handleChange}
        type="email"
        placeholder="Email"
        minLength="2"
        maxLength="40"
        required
      />
      <span className={formEmailClassName}>
        {errors.email}
      </span>
      <input
        className="identity-form__input form__input_user_password"
        id="user-password-input"
        name="password"
        value={values.password || ""}
        onChange={handleChange}
        type="password"
        placeholder="Пароль"
        minLength="6"
        maxLength="200"
        required
      />
      <span className={formPasswordClassName}>
        {errors.password}
      </span>

      <button
        type="submit"
        className="identity-form__submit-btn"
        disabled={!isValid}
      >
        Зарегистрироваться
      </button>
      <div className="identity-form__text">
        <span>Уже зарегистрированы? </span>
        <Link to="/sign-in" className="identity-form__login-link">
          Войти
        </Link>
      </div>
    </form>
  );
};

export default Register;