import React from 'react';

function Login(props) {
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
  
    props.onLogin({ email, password });
  }

  return (
    <form
      className="sign-form"
      name={props.name}
      onSubmit={handleSubmit}
      noValidate
    >
      <h2 className="sign-form__header">Вход</h2>
      <input
        id="sign-in-email-input"
        className="sign-form__input"
        name="email"
        type="email"
        value={email}
        placeholder="Email"
        required
        onChange={handleEmailChange}
      />
      <input
        id="sign-in-password-input"
        className="sign-form__input"
        name="password"
        type="password"
        value={password}
        placeholder="Пароль"
        required
        onChange={handlePasswordChange}
      />   
      <button className="sign-form__submit" type="submit">
        Войти
      </button>
      <p className="sign-form__hint">
        Ещё не зарегистрированы? <a href="/sign-up">Зарегистрироваться</a>
      </p>
    </form>
  );
}

export default Login;