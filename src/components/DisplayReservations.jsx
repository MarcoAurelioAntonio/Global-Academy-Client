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
    <div className="flex w-screen">
      <NavMenu bgColor="green" />
      <div className="reservation-container">
        <div className="reservation-list-container">
          {apiStatus === 'loading' && <p>Loading...</p>}

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
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M13.464 20.536c-.39.39-1.024.39-1.414 0l-6.364-6.364c-.195-.195-.195-.512 0-.707l6.364-6.363c.195-.196.511-.196.707 0s.195.512 0 .707l-5.657 5.657 5.657 5.657c.195.195.195.512 0 .707z" />
            </svg>
            Reserve More Courses!
          </button>
        </div>
      </div>
    </div>
  );
};

export default DisplayReservations;
