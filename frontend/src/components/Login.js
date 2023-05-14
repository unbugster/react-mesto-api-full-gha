import useFormAndValidation from "../hooks/useFormAndValidation";

const Login = ({ onLogin }) => {
  const { values, handleChange, errors, isValid } = useFormAndValidation();

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(values);
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
      <h2 className="identity-form__title">Вход</h2>
      <input
        className="identity-form__input identity-form_user_email"
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
        className="identity-form__input identity-form_user_password"
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
        Войти
      </button>
    </form>
  );
};

export default Login;