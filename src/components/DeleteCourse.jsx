import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCoursesApi, deleteCourseById } from '../redux/coursesSlice';
import NavMenu from './NavMenu';

const DeleteCourse = () => {
  const dispath = useDispatch();
  const { loading, courses, deleted } = useSelector((state) => state.courses);

  useEffect(() => {
    dispath(getAllCoursesApi());
  }, [dispath]);

  return (
    <div className="flex">
      <NavMenu />
      <div>
        {deleted ? (
          <h1 className="hide text-center text-2xl text-red-500">
            Course Deleted Sucessfully.
          </h1>
        ) : null}

        {loading ? (
          <h1 className="text-center text-2xl text-green-500">Loading...</h1>
        ) : (
          courses.map((course) => (
            <div key={course.id} className="flex justify-center gap-4 mt-9">
              <h3>{course.name}</h3>
              <button
                type="button"
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => dispath(deleteCourseById(course.id))}
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default DeleteCourse;
