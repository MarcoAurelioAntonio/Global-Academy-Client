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
  }, [dispatch, courses, status]);

  if (status !== 'succeeded') {
    return (
      <section className="center">loading...</section>
    );
  }

  return (
    <section className="home-container">
      <div className="home-wrapper">
        <div className="over-wrapper">
          <h1 className="home-title">LATEST COURSES</h1>
          <h5>Please select a course</h5>
        </div>
        {
          courses.length === 0 ? (
            <p>No courses available</p>
          ) : (
            <Courses courses={courses} />
          )
        }
      </div>
    </section>
  );
};

export default Home;
