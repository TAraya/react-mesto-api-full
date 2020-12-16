import React from 'react';

function Register(props) {
  const [email, setEMail] = React.useState('');
  const [password, setPassword] = React.useState('');

  function handleEmailChange(e) {
    setEMail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
  
    props.onRegister({ email, password });
  }

  return (
    <form
      className="sign-form"
      name={props.name}
      onSubmit={handleSubmit}
      noValidate
    >
      <h2 className="sign-form__header">Регистрация</h2>
      <input
        id="sign-up-email-input"
        className="sign-form__input"
        name="email"
        type="email"
        value={email}
        placeholder="Email"
        required
        onChange={handleEmailChange}
      />
      <input
        id="sign-up-password-input"
        className="sign-form__input"
        name="password"
        type="password"
        value={password}
        placeholder="Пароль"
        required
        onChange={handlePasswordChange}
      />   
      <button className="sign-form__submit" type="submit">
        Зарегистрироваться
      </button>
      <p className="sign-form__hint">
        Уже зарегистрированы? <a href="/sign-in">Войти</a>
      </p>
    </form>
  );
}

export default Register;