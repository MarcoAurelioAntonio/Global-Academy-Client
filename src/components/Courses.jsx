import React from 'react';
import PropTypes from 'prop-types';
import Carousel from 'react-material-ui-carousel';
import Course from './Course';

const Courses = ({ courses }) => {
  console.log('here');
  console.log(courses);
  let itemsPushed = [];
  const finalItems = [];
  courses.map((item, i) => {
    const ii = i + 1;
    if (ii % 3 === 0) {
      itemsPushed.push(item);
      finalItems.push(itemsPushed);
      itemsPushed = [];
    } else {
      itemsPushed.push(item);
      if (courses.length === ii) {
        finalItems.push(itemsPushed);
      }
    }
    return {
      itemsPushed,
      finalItems,
    };
  });

  return (
    <Carousel
      animation="slide"
      indicators
      autoPlay={false}
      navButtonsAlwaysVisible
      className="carousel-courses"
    >
      {finalItems.map((item, i) => (
        <div className="course-group" key={`item-id-${i * 5}`}>
          {
            item.map((item2, j) => (
              <Course key={`course-id-${j * 5}`} data={item2} />
            ))
          }
        </div>
      ))}
    </Carousel>
  );
};

Courses.propTypes = {
  courses: PropTypes.instanceOf(Array).isRequired,
};

export default Courses;
