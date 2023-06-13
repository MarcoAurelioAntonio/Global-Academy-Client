import { configureStore } from '@reduxjs/toolkit';
import coursesReducer from './coursesSlice';
import reservationsReducer from './reservationsSlice';
import displayreservationsReducer from './displayreservationsSlice';
import usersReducer from './usersSlice';

const store = configureStore({
  reducer: {
    courses: coursesReducer,
    reservations: reservationsReducer,
    displayreservations: displayreservationsReducer,
    users: usersReducer,
  },
});

export default store;
