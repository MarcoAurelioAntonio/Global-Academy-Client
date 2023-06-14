import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getCourseById } from "../redux/coursesSlice";
import { useDispatch, useSelector } from "react-redux";

const Course = () => {
  const { id } = useParams();
  const { course } = useSelector((state) => state.courses);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCourseById(id));
  }, [dispatch, id]);
 
  const hanldeEnroll = () => {
    console.log('enroll')
  }

  return (
    <div className="flex justify-around mt-10 h-screen">
      <div>
        <img
          width='70%'
          src='https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80'
          alt={course.title}
        />
      </div>

      <div>
        <h1>Course tite: {course.name}</h1>
        <p>Course description: {course.description}</p>
        <ul>
          <li>
            <p>Course type: {course.course_type}</p>
          </li>
          <li>
            <p>Course price: {course.price}</p>
          </li>
          <li>
            <p>Start date: {course.start_date}</p>
          </li>
          <li>
            <p>End date: {course.end_date}</p>
          </li>
        </ul>
        <button 
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
        onClick={() => hanldeEnroll()}>
          Enroll Course
        </button>
      </div>
    </div>
  );
};

export default Course;
