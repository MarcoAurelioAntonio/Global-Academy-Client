import React, { useState } from 'react';

const Login = () => {
  const [inputs, setInputs] = useState({ name: '' });
  // const dispatch = useDispatch();

  const handleChange = (ev) => {
    setInputs((prevState) => ({
      ...prevState,
      [ev.target.name]: ev.target.value,
    }));
  };
  const handleClick = (ev) => {
    ev.preventDefault();
    // dispatch(postBookToAPI(inputs));
  };
  return (
    <section className="content">
      <form onSubmit={handleClick}>
        <div className="imgcontainer">LOGO HERE</div>

        <div className="container">
          <label htmlFor="username">
            <b>Username</b>
          </label>
          <input
            type="text"
            placeholder="Enter Username"
            value={inputs.title}
            id="username"
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
