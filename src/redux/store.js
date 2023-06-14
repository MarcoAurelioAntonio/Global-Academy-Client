import { configureStore } from '@reduxjs/toolkit';
import coursesReducer from './coursesSlice';
import reservationsReducer from './reservationsSlice';
import usersReducer from './usersSlice';

const store = configureStore({
  reducer: {
    courses: coursesReducer,
    reservations: reservationsReducer,
    users: usersReducer,
  },
});

export default store;
