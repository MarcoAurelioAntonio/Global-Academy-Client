import { render, screen } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import Login from '../components/Login';

it('Should display 2 buttons on the screen', () => {
  const mockStore = configureStore([]);
  const user = {
    id: 68,
    name: 'Teddy',
  };

  const initialState = {
    users: {
      current_user: user,
      status: 'idle',
      loading: false,
      error: null,
    },
  };

  const store = mockStore(initialState);
  render(
    <BrowserRouter>
      <Provider store={store}>
        <Login />
      </Provider>
    </BrowserRouter>,
  );
  const allLinks = screen.getAllByRole('button');

  expect(allLinks).toHaveLength(2);
  expect(store.getState()).toMatchSnapshot();
});
