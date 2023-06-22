import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Course = ({ data }) => {
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const date1 = new Date(data.start_date);
    const date2 = new Date(data.end_date);
    const durationInMilliseconds = Math.abs(date2 - date1);
    setDuration(Math.floor((durationInMilliseconds / (3600000))));
  }, []);

  return (
    <Link className="course-item" to={`/courses/${data.id}`} state={data}>
      <div className="image-container">
        <img className="course-image-nelson" src={data.image_url} alt="Course-img" />
      </div>
      <p className="course-title" data-testid={`name-${data.id}`}>{ data.name }</p>
      <div className="separator">. . . . . . . . . . .</div>
      <p className="course-label">{ data.description }</p>
      <p className="course-price">
        {`Course-Type: ${data.course_type}`}
      </p>
      <p className="course-price">
        {`Price: ${data.price} $`}
      </p>
      <div className="course-duration">
        <p className="course-price">
          {`Duration: ${duration} hours`}
        </p>
      </div>
    </Link>
  );
};

Course.propTypes = {
  data: PropTypes.instanceOf(Object).isRequired,
};

export default Course;
