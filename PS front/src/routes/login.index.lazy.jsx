import { useNavigate, createLazyFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import axios from 'axios';

export const Route = createLazyFileRoute('/login/')({
  component: Login,
});

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate({ from: '/login' });

  async function SubmitLogin(e) {
    e.preventDefault();

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

  return (
    <div className="flex items-center justify-center h-[calc(100vh-120px)]">
      <div className="flex p-2 content-center justify-center ">
        <div className="relative">
          <div className="border border-blend rounded-md bg-primary relative text-white z-20">
            <div className=" w-fit p-5 border-none border-2 rounded-lg space-y-3 text-lg justify-center">
              <h2 className="flex justify-center font-bold">Login</h2>
              <label className="block">Username: </label>
              <input
                type="text"
                placeholder="Username"
                className="border-solid border-2 p-1 font-bold text-black"
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />

              <label className="block">Password:</label>

              <input
                type="password"
                placeholder="Password"
                className="border-solid border-2 p-1 font-bold text-black"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <br />
              <button
                onClick={SubmitLogin}
                className="cursor-pointer justify-center content-center block mx-auto mt-3 bg-secondary font-bold py-2 px-4 rounded-lg text-black"
              >
                Login
              </button>
            </div>
          </div>
          <div className="absolute -inset-1 rounded-md blur-md bg-gradient-to-br from-primary via-blend to-primary z-10"></div>
        </div>
      </div>
    </div>
  );
}
