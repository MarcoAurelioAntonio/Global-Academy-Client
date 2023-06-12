import { configureStore } from '@reduxjs/toolkit';
import coursesReducer from './coursesSlice';
import reservationsReducer from './reservationsSlice';

const store = configureStore({
  reducer: {
    courses: coursesReducer,
    reservations: reservationsReducer,
  },
});

export default store;
