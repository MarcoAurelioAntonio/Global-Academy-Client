import { render, screen } from '@testing-library/react';
import React from 'react';
import renderer from 'react-test-renderer';
import { BrowserRouter } from 'react-router-dom';
import Course from '../components/Course';

describe('Tests for <Course /> component', () => {
  const courseItem = {
    id: 9,
    name: 'Nelson asdadsasdasdads',
    description: 'dsadasdasdasdasdasdadsasdasdasdasddas',
    start_date: '2023-06-21',
    end_date: '2023-06-24',
    price: '20.0',
    course_type: 'asdads',
    image_url: '',
  };

  it('In the Course screen should be displayed the name of the course', () => {
    render(
      <BrowserRouter>
        <Course data={courseItem} />
        ,
      </BrowserRouter>,
    );
    const element = screen.getByText(courseItem.name);
    expect(element.textContent).toBe(courseItem.name);
  });

  it('Should match the snapshot', () => {
    expect(renderer.create(
      <BrowserRouter><Course data={courseItem} /></BrowserRouter>,
    ).toJSON()).toMatchSnapshot();
  });
});
