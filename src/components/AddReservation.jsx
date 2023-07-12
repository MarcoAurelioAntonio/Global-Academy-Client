import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import { postReservationToAPI, reset } from '../redux/reservationsSlice';
import NavMenu from './NavMenu';

const AddReservation = () => {
  // Retrieve data from other location
  const currentLocation = useLocation();
  const courseSelected = currentLocation.state || null;
  const [course, setCourse] = useState(courseSelected?.id);
  const { status, error, enrolled } = useSelector(
    (store) => store.reservations,
  );
  const user = useSelector((store) => store.users.current_user);
  const courses = useSelector((store) => store.courses.courses);
  const dispatch = useDispatch();
  // const history = useNavigate();

  const handleChange = (ev) => {
    setCourse(ev.target.value);
  };
  const handleClick = (ev) => {
    ev.preventDefault();
    dispatch(reset());
    const reservation = {
      user_id: user.id,
      course_id: course,
    };
    dispatch(postReservationToAPI(reservation));
    setTimeout(() => dispatch(reset()), 5000);
  };

  return (
    <div className="flex">
      <NavMenu bgColor="gray" isHide isBacking={false} />
      <section className="enrollment-content">

        <div className="enrollment-title">
          Are you ready to unlock your full potential?
        </div>
        <p className="enrollment-text">
          By investing in your education, you open doors to new knowledge, skills,
          and opportunities. Embrace the chance to broaden your horizons, gain
          expertise, and boost your career prospects. Remember, learning is a
          lifelong journey, and each course you undertake is a valuable milestone
          along the way. Take that leap of faith and embark on an exciting
          educational adventure today!
        </p>
        <div className="enroll-container">
          <form onSubmit={handleClick}>
            <label htmlFor="name">
              <input
                className="enroll-field"
                type="text"
                placeholder="Enter Username"
                value={user.name}
                name="name"
                disabled
              />
            </label>
            <br />
            <label htmlFor="Course">
              {courseSelected ? (
                <input
                  className="enroll-field"
                  type="text"
                  value={courseSelected.name}
                  name="name"
                  disabled
                />
              ) : (
                <select
                  className="enroll-field"
                  name="course"
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
            <button
              className="enroll-btn-ken"
              type="submit"
              disabled={status === 'loading' && true}
            >
              ENROLL NOW
            </button>
          </form>
        </div>
        <section className="msg-section">
          <p className="error">{error}</p>
          <p className="success">
            {enrolled && 'You have been enrolled successfully. Enjoy learning!'}
          </p>
        </section>
      </section>
    </div>
  );
};

export default AddReservation;
