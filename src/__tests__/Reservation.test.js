import { render, screen } from '@testing-library/react';
import React from 'react';
import renderer from 'react-test-renderer';
import { BrowserRouter } from 'react-router-dom';
import Reservation from '../components/Reservation';

describe('Tests for <Reservation /> component', () => {
  const reservationItem = {
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
  };

  it('The name of the course should be display properly.', () => {
    render(
      <BrowserRouter>
        <Reservation reservation={reservationItem} />
        ,
      </BrowserRouter>,
    );
    const element = screen.getByText(reservationItem.course.name);
    expect(element.textContent).toBe(reservationItem.course.name);
  });

  it('Should match the snapshot', () => {
    expect(renderer.create(
      <BrowserRouter><Reservation reservation={reservationItem} /></BrowserRouter>,
    ).toJSON()).toMatchSnapshot();
  });
});
