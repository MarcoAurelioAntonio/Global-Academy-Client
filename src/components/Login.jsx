import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { postUserToAPI } from '../redux/usersSlice';

const Login = () => {
  const [inputs, setInputs] = useState({ name: '' });
  const dispatch = useDispatch();

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

  return (
    <section className="content">
      <form onSubmit={handleClick}>
        <div className="imgcontainer">LOGO HERE</div>

        <div className="container">
          <label htmlFor="name">
            <b>Username</b>
          </label>
          <input
            type="text"
            placeholder="Enter Username"
            value={inputs.title}
            id="name"
            name="name"
            required
            onChange={handleChange}
          />
          <button type="submit">Login</button>
        </div>
      </form>
    </section>
  );
};

export default Login;
