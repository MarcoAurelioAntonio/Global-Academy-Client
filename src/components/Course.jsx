import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Course = ({ data }) => (
  <Link className="course-item" to="/add-reservation" state={data}>
    <p className="course-title">{ data.name }</p>
    <p className="course-label">{ data.course_type }</p>
    <p className="course-price">{ data.price }</p>
    <div className="course-duration">
      <p className="course-label">
        From:
        { data.start_date }
      </p>
      <p className="course-label">
        To:
        { data.end_date }
      </p>
    </div>
  </Link>
);

Course.propTypes = {
  data: PropTypes.instanceOf(Object).isRequired,
};

export default Course;
