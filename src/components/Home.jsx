import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCoursesApi } from '../redux/coursesSlice';
import Courses from './Courses';
import NavMenu from './NavMenu';

const Home = () => {
  const { courses, loading } = useSelector((store) => store.courses);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCoursesApi());
  }, []);

  return (
    <section className="home-container">
      <NavMenu bgColor="green" isBacking={false} isHide={false} />
      {
        loading && <p>Loading...</p>
      }
      <div className="home-wrapper">
        <div className="over-wrapper">
          <h1 className="home-title">LATEST COURSES</h1>
          <h5>Please select a course</h5>
          <div className="separator">. . . . . . . . . . .</div>
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
