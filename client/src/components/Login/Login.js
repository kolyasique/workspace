/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable max-len */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import './Login.css';
import './toggle.css';

const formInitialState = {
  login: '',
  password: '',
};

export default function Login() {
  const [loginForm, setLoginForm] = useState([]);
  const [admSignup, setAdmSignup] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleFormChange = () => {
    setAdmSignup(!admSignup);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const url = admSignup ? 'http://localhost:6622/api/auth/signinworker' : 'http://localhost:6622/api/auth/signinadmin';
    fetch(url, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginForm),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.msg === 'Wrong login') { alert('Неверный логин'); navigate('/login'); } else if (res.msg === 'Wrong pass') { alert('Неверный пароль'); navigate('/login'); } else { dispatch({ type: 'USER_SIGNIN', payload: res }); }
      })
      .catch(console.error);
    if (admSignup) { navigate('/workerpage'); } else { navigate('/adminpage'); }

    setLoginForm(formInitialState);
  };

  const handleInput = (e) => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  };
  return (
    // {`mb-3 ${isSignup ? 'visible' : 'invisible'}`}
    <div className="loginFormDiv">
      <form className="loginForm" onSubmit={handleSubmit}>
        {/* <div className={`mb-3 ${isSignup ? 'visible' : 'invisible'}`}> */}
        <div className="inf">
          {/* <img className="log8o" src={log8o} alt="VB" /> */}
          <p className="inftext">Вход</p>
        </div>
        {!admSignup ? (
          <div className="form-input1">
            <label className="form-label">ИНН организации</label>
            <input type="text" className="form-control" value={loginForm.inn} name="inn" onChange={handleInput} />
          </div>
        ) : (
          <div className="form-input1">
            <label className="form-label">Логин пользователя</label>
            <input type="text" className="form-control" value={loginForm.login} name="login" onChange={handleInput} />
          </div>
        )}

        <div className="form-input1">
          <label className="form-label">Password</label>
          <input type="password" className="form-control" value={loginForm.password} name="password" onChange={handleInput} />
        </div>

        <div className="toggle1-switch">
          <p>Войти как сотрудник</p>
          <div>
            <input className="toggle1" type="checkbox" id="toggle1" onClick={handleFormChange} checked={!admSignup} />
            <label className="toggle1-label" htmlFor="toggle1" />
          </div>
          <p>Войти как админ</p>
        </div>

        <button type="submit" className="buttonSubmit">Submit</button>
      </form>
    </div>
  );
}
