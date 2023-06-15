import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCoursesApi, deleteCourseById } from '../redux/coursesSlice';

const DeleteCourse = () => {
  const dispath = useDispatch();
  const { loading, courses, deleted } = useSelector((state) => state.courses);

  useEffect(() => {
    dispath(getAllCoursesApi());
  }, [dispath]);

  return (
    <div className="delete-course flex flex-col items-center mt-10 h-screen">
      {deleted ? (
        <h1 className="hide text-center text-2xl text-red-500 mb-5">
          Course Deleted Sucessfully.
        </h1>
      ) : null}

      {loading ? (
        <h1 className="text-center text-2xl text-green-500">Loading...</h1>
      ) : (
        <div className="flex overflow-x-auto shadow-md sm:rounded-lg  w-3/5">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 justify-center ">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Course name
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            {courses.map((course) => (
              <tbody key={course.id}>
                <tr className="<%= i % 2 != 0 ? 'border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700' : 'bg-white border-b dark:border-gray-700' %>">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium whitespace-nowrap dark:text-white"
                  >
                    {course.name}
                  </th>
                  <td className="px-6 py-4">
                    <button
                      type="button"
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                      onClick={() => dispath(deleteCourseById(course.id))}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
      )}
    </div>
  );
};

export default DeleteCourse;
