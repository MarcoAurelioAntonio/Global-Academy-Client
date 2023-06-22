import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCourseById } from '../redux/coursesSlice';
import NavMenu from './NavMenu';

const CourseDetails = () => {
  const { id } = useParams();
  const { course } = useSelector((state) => state.courses);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCourseById(id));
  }, [dispatch, id]);

  return (
    <div className="flex flex-col md:flex-row justify-between my-16 h-screen gap-12 px-10">

      <NavMenu bgColor="" isHide isBacking />
      <div className="flex flex-col justify-start items-start w-full">
        <div className="flex flex-col items-center justify-center md:flex-row flex-shrink gap-12 w-full md:items-start">
          <div className="flex flex-col w-1/2 ml-8">
            <img
              className="course-image"
              width="100%"
              height="50%"
              src={course.image_url}
              alt={course.title}
            />
          </div>

          <div className="w-full px-5 flex flex-col md:w-1/2">
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

    </div>
  );
};

export default CourseDetails;
