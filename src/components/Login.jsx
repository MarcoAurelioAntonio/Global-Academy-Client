import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUserFromAPI, postUserToAPI } from '../redux/usersSlice';

const Login = () => {
  const [inputs, setInputs] = useState({ name: '' });
  const { status, error } = useSelector((store) => store.users);
  const dispatch = useDispatch();
  const history = useNavigate();

  const handleChange = (ev) => {
    setInputs((prevState) => ({
      ...prevState,
      [ev.target.name]: ev.target.value,
    }));
  };
  const handleLoginClick = (ev) => {
    ev.preventDefault();
    dispatch(getUserFromAPI(inputs.name));
  };

  const handleRegisterClick = (ev) => {
    ev.preventDefault();
    dispatch(postUserToAPI(inputs));
  };

  // Redirect if user successfully logged in
  if (status === 'succeed') {
    setTimeout(() => history('/'));
  }

  return (
    <section className="content-login">
      <form onSubmit={handleLoginClick}>
        <div className="imgcontainer">
          <img className="avatar" src="/images/logo.png" alt="Logo" />
        </div>

        <div className="container">
          <label htmlFor="name">
            <input
              className="field"
              type="text"
              placeholder="Enter Username"
              value={inputs.title}
              id="name"
              name="name"
              required
              onChange={handleChange}
              minLength={3}
            />
          </label>
          <section className="msg-section">
            <p className="error">{error && `Username ${error}`}</p>
          </section>
          <button className="lg-btn" type="submit" disabled={status === 'loading' && true}>
            Login
          </button>
          <button
            className="reg-btn"
            type="button"
            onClick={handleRegisterClick}
            disabled={status === 'loading' && true}
          >
            Register
          </button>
        </div>
      </form>
    </section>
  );
};

export default Login;
