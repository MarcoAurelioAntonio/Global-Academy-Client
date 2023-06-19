import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCourseById } from '../redux/coursesSlice';

const CourseDetails = () => {
  const { id } = useParams();
  const { course } = useSelector((state) => state.courses);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCourseById(id));
  }, [dispatch, id]);

  return (
    <div className="flex flex-col md:flex-row justify-between my-16 h-screen gap-12 md:mr-16 ">
      <nav className="flex">
        <ul className="flex flex-row md:flex-col space-x-8 ">
          <li>
            <a href="/courses" className="text-blue-500 hover:text-blue-800">
              Courses
            </a>
          </li>
          <li>
            <a href="/courses" className="text-blue-500 hover:text-blue-800">
              Courses
            </a>
          </li>
          <li>
            <a href="/courses" className="text-blue-500 hover:text-blue-800">
              Courses
            </a>
          </li>
          <li>
            <a href="/courses" className="text-blue-500 hover:text-blue-800">
              Courses
            </a>
          </li>
        </ul>
      </nav>
      <div className="flex flex-col items-center md:flex-row flex-shrink gap-12">
        <img
          className="course-image"
          width="50%"
          height="50%"
          src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80"
          alt={course.title}
        />
        <div className="flex flex-col md:w-2/5">
          <h1 className="text-4xl text-end">{course.name}</h1>
          <p className="text-end">{course.description}</p>
          <ul className="mt-4">
            <li className="flex justify-between border p-3  bg-slate-300 ">
              <p>Course type</p>
              <p className="font-bold">
                {' '}
                {course.course_type}
              </p>
            </li>
            <li className="flex justify-between  p-3 ">
              <p>Course price</p>
              <p className="font-bold">
                {' '}
                {course.price}
              </p>
            </li>
            <li className="flex justify-between border p-3  bg-slate-300">
              <p>Start date</p>
              <p className="font-bold">{course.start_date}</p>
            </li>
            <li className="flex justify-between p-3 ">
              <p>End date</p>
              <p className="font-bold">
                {' '}
                {course.end_date}
              </p>
            </li>
          </ul>

          <Link
            className="enroll-btn"
            to="/add-reservation"
            state={course}
          >
            Enroll Course
            <span className="material-symbols-outlined">
              arrow_circle_right
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
