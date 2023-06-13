import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCoursesApi } from '../redux/coursesSlice';
import Courses from './Courses';

const Home = () => {
  const { courses, status } = useSelector((store) => store.courses);
  const dispatch = useDispatch();

  useEffect(() => {
    if (courses.length > 0) return;
    if (status === 'failed') return;
    dispatch(getAllCoursesApi());
  }, [dispatch]);

  if (status !== 'succeeded') {
    return (
      <section className="center">loading...</section>
    );
  }

  return (
    <section className="home-container">
      <h1>LATEST COURSES</h1>
      <h5>Please select a course</h5>
      <Courses courses={courses} />
    </section>
  );
};

export default Home;
