import { useState } from 'react';
import { login } from '../services/authService';

const Login = ({ onLogin }) => {
  const [nickname, setnickname] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = await login(nickname, password);
    if (userData) {
      onLogin(userData.user);
    } else {
      setError('Invalid nickname or password');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input type="nickname" placeholder="nickname" value={nickname} onChange={(e) => setnickname(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
