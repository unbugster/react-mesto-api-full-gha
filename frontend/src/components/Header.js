
import logo from '../images/header-logo.svg';
import { Link, Route, Routes } from "react-router-dom";

const Header = (props) => {
  const { email, onSignOut } = props;
  return (
    <header className="header">
      <img className="logo" src={logo} alt="Логотип" />
      <div className="header__info">
        {email && <p className="header__user-email">{email}</p>}
        <Routes>
          <Route
            path="/sign-up"
            element={
              <Link className="header__link" to="/sign-in">
                Войти
              </Link>
            }
          />
          <Route
            path="/sign-in"
            element={
              <Link className="header__link" to="/sign-up">
                Регистрация
              </Link>
            }
          />
          <Route
            path="/"
            element={
              <Link className="header__link" onClick={onSignOut} to="/sign-in">
                Выйти
              </Link>
            }
          />
        </Routes>
      </div>
    </header>
  )
};

export default Header;