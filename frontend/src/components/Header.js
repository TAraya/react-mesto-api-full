import React from 'react';
import headerLogo from '../images/header_logo.svg';

function Header(props) {
  return (
    <header className="header">
      <img className="header__logo" src={headerLogo} alt="Место Россия"/>
      {props.loggedIn && <p className="header__login">{props.login}</p>}
      <a className="header__link" href={props.linkPath}>{props.link}</a>
      {props.loggedIn && <button className="header__logout-button" onClick={props.onLogout}>Выход</button>}
    </header>
  );
}

export default Header;