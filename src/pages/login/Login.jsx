import React from 'react';
import { useHistory } from 'react-router-dom';
import { saveTokenInStorage } from '../../services/api';

function Login() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const history = useHistory();

  const loginRequiriments = () => {
    const PASSWORD_LIMIT_SIZE = 6;
    const emailRegex = /\S+@\S+\.\S+/i;
    return emailRegex.test(email) && password && password.length >= PASSWORD_LIMIT_SIZE;
  };

  const handleSubmit = () => {
    saveTokenInStorage(email);
    history.push('/foods');
  };

  return (
    <div>
      <form onSubmit={ handleSubmit }>
        <input
          type="email"
          data-testid="email-input"
          value={ email }
          onChange={ (event) => setEmail(event.target.value) }
          placeholder="email@xample.com"
        />
        <input
          type="password"
          data-testid="password-input"
          value={ password }
          onChange={ (event) => setPassword(event.target.value) }
          placeholder="**********"
        />
        <button
          type="submit"
          data-testid="login-submit-btn"
          disabled={ !loginRequiriments() }
        >
          Logar
        </button>
      </form>
    </div>
  );
}

export default Login;
