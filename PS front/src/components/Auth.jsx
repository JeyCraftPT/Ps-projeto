import axios from 'axios';
import { useNavigate } from '@tanstack/react-router';

const navigate = useNavigate({ from: '/register' });

// Função do Registo
export async function SubmitRegister(username, email, password) {
  try {
    const response = await axios.post('http://localhost:3001/register', {
      username,
      email,
      password,
    });

    const { data } = response;

    if (data === 'UtilizadorExiste') {
      alert('Esse utilizador já existe!');
    } else if (data.token) {
      const token = data.token;
      localStorage.setItem('token', token);
      navigate({ to: '/profile', state: { id: username } });
    }
  } catch (e) {
    console.log(e);
  }
}

// Função do Login
export async function SubmitLogin(username, password) {
  try {
    const response = await axios.post('http://localhost:3001/login', {
      username,
      password,
    });

    const { data } = response;

    if (data.token) {
      const token = data.token;
      localStorage.setItem('token', token);
      navigate({ to: '/profile', state: { id: username } });
    } else if (data == 'UtilizadorNaoExiste') {
      alert('Esse utilizador não existe!');
    } else if (data == 'PasswordErrada') {
      alert('Password Errada');
    }
  } catch (e) {
    console.log(e);
  }
}
