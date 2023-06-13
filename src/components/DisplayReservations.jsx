import React, { useEffect } from 'react';
import {
  useDispatch,
  useSelector,
} from 'react-redux';
import { getAllReservationsApi } from '../redux/displayreservationsSlice';

const DisplayReservations = () => {
  const dispatch = useDispatch();
  const apiData = useSelector((state) => state.displayreservations.data);
  const apiStatus = useSelector((state) => state.displayreservations.status);
  const apiError = useSelector((state) => state.displayreservations.error);

  useEffect(() => {
    dispatch(getAllReservationsApi());
  }, [dispatch]);

  return (
    <div style={{
      display: 'flex', justifyContent: 'center', alignItems: 'center', height: 'auto',
    }} // some style to see the content. DETELE IT
    >
      <h1>DisplayReservations</h1>
      <br />
      {apiStatus === 'loading' && <p>Loading...</p>}

      <ul>
        {apiData.map((reservation) => (
          <li key={reservation.id}>
            <h2>
              NAME:
              {reservation.course.name}
            </h2>
            <p>
              DESCRIPTION:
              {reservation.course.description}
            </p>
            <p>
              Start Date:
              {reservation.course.start_date}
            </p>
            <p>
              End Date:
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