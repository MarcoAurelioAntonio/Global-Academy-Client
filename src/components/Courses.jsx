import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Carousel from 'react-material-ui-carousel';
import Course from './Course';
import arrowNext from '../assets/images/carousel-arrow-left.png';
import arrowBack from '../assets/images/carousel-arrow-rigth.png';

const Courses = ({ courses }) => {
  let itemsPushed = [];
  const finalItems = [];

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    // Clean up the event listener
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

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
    <>
      {
        windowWidth >= 1000 ? (
          <Carousel
            animation="slide"
            indicators
            autoPlay={false}
            navButtonsAlwaysVisible
            cycleNavigation={false}
            navButtonsProps={{
              style: {
                backgroundColor: 'transparent',
                borderRadius: 0,
                padding: 0,
                margin: 0,
              },
            }}
            NextIcon={<img className="carousel-icon" src={arrowNext} alt="next-arrow" />}
            PrevIcon={<img className="carousel-icon" src={arrowBack} alt="back-arrow" />}
            className="carousel-courses"
          >
            {finalItems.map((item, i) => (
              <div className="course-group" data-testid="courses-item" key={`item-id-${i * 5}`}>
                {
                  item.map((item2, j) => (
                    <Course key={`course-id-${j * 5}`} data={item2} />
                  ))
                }
              </div>
            ))}
          </Carousel>
        ) : (
          <div className="mobile-courses">
            {
              courses.map((item, i) => (
                <Course key={`course-id-${i * 5}`} data={item} />
              ))
            }
          </div>
        )
      }
    </>
  );
};

Courses.propTypes = {
  courses: PropTypes.instanceOf(Array).isRequired,
};

export default Courses;
