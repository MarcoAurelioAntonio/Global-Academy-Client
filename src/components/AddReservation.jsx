import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postReservationToAPI } from '../redux/reservationsSlice';

const AddReservation = () => {
  const [course, setCourse] = useState(null);
  const status = useSelector((store) => store.reservations.status);
  const user = useSelector((store) => store.users.current_user);
  const dispatch = useDispatch();

  const handleChange = (ev) => {
    setCourse(ev.target.value);
  };
  const handleClick = (ev) => {
    ev.preventDefault();
    const reservation = { user_id: user.id, course_id: course };
    dispatch(postReservationToAPI(reservation));
  };

  // Redirect if user successfully logged in
  if (status === 'succeed') {
    // setTimeout(() => history('/reservations'));
  }

  return (
    <section className="content">
      <h1>Enrollment</h1>
      <form onSubmit={handleClick}>
        <div className="add-reservation-container">
          <label htmlFor="name">
            Username
            <input
              type="text"
              placeholder="Enter Username"
              value={user.name}
              name="name"
              disabled
            />
          </label>
          <br />
          <label htmlFor="Course">
            Course
            <select
              name="course"
              className="inputField"
              onChange={handleChange}
              required
            >
              <option value="1">Course 1</option>
              <option value="2">Course 2</option>
              <option value="3">Course 3</option>
            </select>
          </label>
          <br />
          <button type="submit">Enroll</button>
        </div>
        <div className="container">
          <ul>
            <li>
              {status === 'failed' && 'Something went wrong.Please retry' }
              {status === 'success' && 'You have been enrolled successfully. Enjoy learning!'}
            </li>
          </ul>
        </div>
      </form>
    </section>
  );
};

export default AddReservation;
