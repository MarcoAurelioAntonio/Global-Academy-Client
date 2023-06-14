import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { postUserToAPI } from '../redux/usersSlice';

const Login = () => {
  const [inputs, setInputs] = useState({ name: '' });
  const status = useSelector((store) => store.users.status);

  const dispatch = useDispatch();
  const history = useNavigate();

  const handleChange = (ev) => {
    setInputs((prevState) => ({
      ...prevState,
      [ev.target.name]: ev.target.value,
    }));
  };
  const handleClick = (ev) => {
    ev.preventDefault();
    dispatch(postUserToAPI(inputs));
  };

  // Redirect if user successfully logged in
  if (status === 'succeed') {
    setTimeout(() => history('/add-reservation'));
  }

  return (
    <section className="content">
      <form onSubmit={handleClick}>
        <div className="imgcontainer">LOGO HERE</div>

        <div className="container">
          <label htmlFor="name">
            Username
            <input
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
          <br />
          <button type="submit">Login</button>
        </div>
        <div className="container">
          <ul>
            <li>
              {status === 'failed'
                && 'Username already taken,please try another one.'}
            </li>
          </ul>
        </div>
      </form>
    </section>
  );
};

export default Login;
