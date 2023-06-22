import { render, screen } from '@testing-library/react';
import { configureStore, createSlice } from '@reduxjs/toolkit';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import Home from '../components/Home';

describe('Tests for <Home /> component', () => {
  const user = {
    id: 1,
    name: 'Nelson',
  };

  const userSlice = createSlice({
    name: 'users',
    initialState: {
      current_user: user,
      status: 'idle',
      loading: false,
      error: null,
    },
  });

  const coursesList = [{
    id: 9,
    name: 'Nelson asdadsasdasdads',
    description: 'dsadasdasdasdasdasdadsasdasdasdasddas',
    start_date: '2023-06-21',
    end_date: '2023-06-24',
    price: '20.0',
    course_type: 'asdads',
    image_url: '',
  },
  {
    id: 10,
    name: 'THis is new from zoom',
    description: 'This is a test from the last meeting',
    start_date: '2023-06-22',
    end_date: '2023-06-28',
    price: '45.0',
    course_type: 'Biology',
    image_url: '',
  },
  {
    id: 11,
    name: 'Last test',
    description: 'This is a description asdadsasd',
    start_date: '2023-06-22',
    end_date: '2023-06-30',
    price: '45.0',
    course_type: 'Computing',
    image_url: '',
  }];

  const coursesSlice = createSlice({
    name: 'courses',
    initialState: {
      courses: coursesList,
      course: {},
      status: 'idle',
      loading: false,
      error: null,
      deleted: false,
    },
  });

  const store = configureStore({
    reducer: {
      users: userSlice.reducer,
      courses: coursesSlice.reducer,
    },
  });

  it('In the home screen should be displayed 3 courses', () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Home />
        </Provider>
      </BrowserRouter>,
    );
    const element = screen.getByTestId('courses-item');
    expect(element.children.length).toBe(3);
  });
  it('Should match the snapshot', () => {
    expect(renderer.create(
      <BrowserRouter>
        <Provider store={store}>
          <Home />
        </Provider>
      </BrowserRouter>,
    ).toJSON()).toMatchSnapshot();
  });
});
