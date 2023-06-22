import { render, screen } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import AddReservation from '../components/AddReservation';

it('Should display 1 button on the screen', () => {
  const mockStore = configureStore([]);
  const user = {
    id: 1,
    name: 'Teddy',
  };

  const courses = [
    {
      id: 1,
      name: 'Master React',
      description: 'Lorem ipsu dolor',
    },
  ];

  const initialState = {
    users: {
      current_user: user,
      status: 'idle',
      loading: false,
      error: null,
    },
    courses: {
      courses,
      course: {},
      status: 'idle',
      loading: false,
      error: null,
      deleted: false,
    },
    reservations: {
      reservations: [],
      status: 'idle',
      loading: false,
      error: null,
      userId: null,
      enrolled: false,
    },
  };

  const store = mockStore(initialState);
  render(
    <BrowserRouter>
      <Provider store={store}>
        <AddReservation />
      </Provider>
    </BrowserRouter>,
  );
  const buttons = screen.getAllByText('ENROLL NOW');
  const courseName = screen.getByText('Master React');

  expect(buttons).toHaveLength(1);
  expect(courseName).toContainHTML(courses[0].name);
  expect(store.getState()).toMatchSnapshot();
});
