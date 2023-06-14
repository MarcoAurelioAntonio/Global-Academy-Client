import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import { postReservationToAPI } from '../redux/reservationsSlice';
import { getAllCoursesApi } from '../redux/coursesSlice';

const AddReservation = () => {
  const [course, setCourse] = useState(null);
  const { status, error } = useSelector((store) => store.reservations);
  const user = useSelector((store) => store.users.current_user);
  const courses = useSelector((store) => store.courses.courses);
  const dispatch = useDispatch();
  // Retrieve data from other location
  const currentLocation = useLocation();
  const courseSelected = currentLocation.state || null;
  // Load the Courses
  useEffect(() => {
    if (courses.length > 0) return;
    if (status === 'failed') return;
    dispatch(getAllCoursesApi());
  }, [courses.length, dispatch, status]);

  const handleChange = (ev) => {
    setCourse(ev.target.value);
  };
  const handleClick = (ev) => {
    ev.preventDefault();
    if (courseSelected) {
      setCourse(courseSelected.id);
    }
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
            { courseSelected ? (
              <input
                type="text"
                value={courseSelected.name}
                name="name"
                disabled
              />
            ) : (
              <select
                name="course"
                className="inputField"
                onChange={handleChange}
                required
              >
                <option value="">Select your course</option>
                {courses.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            )}

          </label>
          <br />
          <button type="submit">Enroll</button>
        </div>
        <div className="container">
          <ul>
            <li>
              {error}
              {status === 'succeed'
                && 'You have been enrolled successfully. Enjoy learning!'}
            </li>
          </ul>
        </div>
      </form>
    </section>
  );
};

export default AddReservation;
