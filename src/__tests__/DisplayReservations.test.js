import { render, screen } from '@testing-library/react';
import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import thunk from 'redux-thunk';
import DisplayReservations from '../components/DisplayReservations';
import { getAllReservationsApi } from '../redux/reservationsSlice';

describe('Tests for <DisplayReservations /> component', () => {
  const mockStore = configureStore([thunk]);
  const user = {
    id: 1,
    name: 'Teddy',
  };
  const reservationsList = [
    {
      id: 1,
      user_id: 1,
      course_id: 1,
      created_at: '2023-06-20T22:04:22.218Z',
      updated_at: '2023-06-20T22:04:22.218Z',
      course: {
        id: 1,
        name: 'Master Data Structures',
        description: 'Description related to the course',
        course_type: 'Programming',
        price: '200.0',
        start_date: '2023-06-21',
        end_date: '2023-07-21',
        created_at: '2023-06-20T22:03:45.571Z',
        updated_at: '2023-06-20T22:03:45.861Z',
        image_url: 'http://localhost:3000/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBCZz09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--2e2c6f24621c425f569dcfdc5f64d41d7aa1f592/pexels-karolina-grabowska-4497759.jpg',
      },
    },
    {
      id: 3,
      user_id: 1,
      course_id: 2,
      created_at: '2023-06-20T23:23:29.875Z',
      updated_at: '2023-06-20T23:23:29.875Z',
      course: {
        id: 2,
        name: 'Welcom to Django',
        description: 'This the description for the course.',
        course_type: 'Programming',
        price: '120.0',
        start_date: '2023-06-21',
        end_date: '2023-08-12',
        created_at: '2023-06-20T22:06:45.456Z',
        updated_at: '2023-06-20T22:06:45.473Z',
        image_url: 'http://localhost:3000/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBCdz09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--244ed3afa474f25ee9617690e93ae3bad99e3b1c/pexels-ono-kosuki-5999812.jpg',
      },
    },
  ];

  const mockResponse = {
    users: {
      current_user: user,
      status: 'idle',
      loading: false,
      error: null,
    },
    reservations: {
      reservations: reservationsList,
      status: 'idle',
      loading: false,
      error: null,
      userId: null,
      enrolled: false,
    },
  };

  jest.spyOn(global, 'fetch').mockResolvedValue({
    json: jest.fn().mockResolvedValue(mockResponse),
  });

  const store = mockStore(mockResponse); // Initialize the mock store
  store.dispatch(getAllReservationsApi(1)); // Dispatch the action
  global.fetch.mockRestore(); // Restore the original `fetch` function

  it('Should display 2 cards on the screen', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <DisplayReservations />
          ,
        </BrowserRouter>
      </Provider>
      ,
    );
    const element = screen.getByTestId('reservations');
    expect(element.children.length).toBe(2);
  });
  it('Should match the snapshot', () => {
    expect(renderer.create(
      <Provider store={store}>
        <BrowserRouter>
          <DisplayReservations />
        </BrowserRouter>
      </Provider>,
    ).toJSON()).toMatchSnapshot();
  });
});
