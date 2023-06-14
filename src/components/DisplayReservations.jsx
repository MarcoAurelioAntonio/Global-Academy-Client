import React, { useEffect } from 'react';
import {
  useDispatch,
  useSelector,
} from 'react-redux';
import { getAllReservationsApi } from '../redux/reservationsSlice';

const DisplayReservations = () => {
  const apiError = useSelector((state) => state.reservations.error);
  const dispatch = useDispatch();
  const apiData = useSelector((state) => state.reservations.data);
  const apiStatus = useSelector((state) => state.reservations.status);

  const userId = 2; // HARDCODED FOR NOW

  useEffect(() => {
    dispatch(getAllReservationsApi(userId));
  }, [dispatch, userId]);

  return (
    <div style={{
      display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column',
    }} // some style to see the content. DETELE IT
    >
      <h1>DisplayReservations</h1>
      <br />
      {apiStatus === 'loading' && <p>Loading...</p>}

      <ul>
        {apiData.map((reservation) => (
          <li key={reservation.id}>
            <h2>
              NAME:&nbsp;&nbsp;&nbsp;&nbsp;
              {reservation.course.name}
            </h2>
            <p>
              DESCRIPTION:&nbsp;&nbsp;&nbsp;
              {reservation.course.description}
            </p>
            <p>
              Start Date:&nbsp;&nbsp;&nbsp;
              {reservation.course.start_date}
            </p>
            <p>
              End Date:&nbsp;&nbsp;&nbsp;
              {reservation.course.end_date}
            </p>
            <br />
            <br />
          </li>
        ))}
      </ul>

      {apiStatus === 'failed' && (
      <p>
        Error:
        {apiError}
      </p>
      )}
    </div>
  );
};

export default DisplayReservations;
