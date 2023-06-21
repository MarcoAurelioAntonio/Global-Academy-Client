import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getAllReservationsApi } from '../redux/reservationsSlice';
import Reservation from './Reservation';
import './displayReservations.css';
import NavMenu from './NavMenu';

const DisplayReservations = () => {
  const dispatch = useDispatch();
  const apiError = useSelector((state) => state.reservations.error);
  const apiData = useSelector((state) => state.reservations.reservations);
  const apiStatus = useSelector((state) => state.reservations.status);
  const user = useSelector((store) => store.users.current_user);
  const userId = user.id;

  const history = useNavigate();

  const handleBackToMain = () => {
    setTimeout(() => history('/add-reservation'), 1000);
  };

  useEffect(() => {
    dispatch(getAllReservationsApi(userId));
  }, [dispatch, userId]);

  return (
    <div className="flex">
      <NavMenu bgColor="green" isBacking={false} isHide={false} />
      <div className="reservation-container">
        <h2 className="course-title">MY COURSES</h2>
        <div className="reservation-list-container">
          {apiStatus === 'loading' && <p>Loading...</p>}

          {apiData.length === 0 && (
            <p className="message">You don`t have any Enrollment yet...</p>
          )}

          {apiData.map((reservation) => (
            <Reservation key={reservation.id} reservation={reservation} />
          ))}

          {apiStatus === 'failed' && (
          <p className="error-message">
            Error:
            { apiError}
          </p>
          )}

        </div>
        <div>
          <button type="button" className="back-button" onClick={handleBackToMain}>
            Enroll for More
          </button>
        </div>
      </div>
    </div>
  );
};

export default DisplayReservations;
