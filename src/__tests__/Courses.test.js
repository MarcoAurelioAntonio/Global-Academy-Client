import { render, screen } from '@testing-library/react';
import React from 'react';
import renderer from 'react-test-renderer';
import { BrowserRouter } from 'react-router-dom';
import Courses from '../components/Courses';

describe('Tests for <Courses /> component', () => {
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

  it('In the home screen should be displayed 3 courses', () => {
    render(
      <BrowserRouter>
        <Courses courses={coursesList} />
        ,
      </BrowserRouter>,
    );
    const element = screen.getByTestId('courses-item');
    expect(element.children.length).toBe(3);
  });
  it('Should match the snapshot', () => {
    expect(renderer.create(
      <BrowserRouter><Courses courses={coursesList} /></BrowserRouter>,
    ).toJSON()).toMatchSnapshot();
  });
});
