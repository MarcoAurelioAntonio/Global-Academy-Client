import { configureStore } from '@reduxjs/toolkit';
import coursesReducer from './coursesSlice';
import reservationsReducer from './reservationsSlice';
import displayreservationsReducer from './displayreservationsSlice';

const store = configureStore({
  reducer: {
    courses: coursesReducer,
    reservations: reservationsReducer,
    displayreservations: displayreservationsReducer,
  },
});

export default store;
