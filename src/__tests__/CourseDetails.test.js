import { render, screen } from '@testing-library/react';
import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import thunk from 'redux-thunk';
import CourseDetails from '../components/CourseDetails';
import { getCourseById } from '../redux/coursesSlice';

describe('Tests for <CourseDetails /> component', () => {
  const mockStore = configureStore([thunk]);
  const user = {
    id: 1,
    name: 'Teddy',
  };
  const course = {
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
  };
  const mockResponse = {
    users: {
      current_user: user,
      status: 'idle',
      loading: false,
      error: null,
    },
    courses: {
      courses: [],
      course,
      status: 'idle',
      loading: false,
      error: null,
      deleted: false,
    },
  };
  jest.spyOn(global, 'fetch').mockResolvedValue({
    json: jest.fn().mockResolvedValue(mockResponse),
  });
  const store = mockStore(mockResponse); // Initialize the mock store
  store.dispatch(getCourseById(1)); // Dispatch the action
  global.fetch.mockRestore(); // Restore the original `fetch` function
  it('Should display 2 cards on the screen', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <CourseDetails />
          ,
        </BrowserRouter>
      </Provider>
      ,
    );
    const courseName = screen.getByText('Master Data Structures');
    expect(courseName).toBeInTheDocument();
  });
  it('Should match the snapshot', () => {
    expect(renderer.create(
      <Provider store={store}>
        <BrowserRouter>
          <CourseDetails />
        </BrowserRouter>
      </Provider>,
    ).toJSON()).toMatchSnapshot();
  });
});
