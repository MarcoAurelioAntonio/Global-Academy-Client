import React from 'react';
import PropTypes from 'prop-types';

const Reservation = ({ reservation }) => (
  <div className="card">
    <img className="card-img" src="/images/course-1.jpg" alt="Avatar" />
    <div className="container">
      <p className="course-name">{reservation.course.name}</p>
      <div className="course-info">
        <p>Start date :</p>
        <span>{reservation.course.start_date}</span>
      </div>
      <div className="course-info">
        <p>End date :</p>
        <span>{reservation.course.end_date}</span>
      </div>
      <div className="card-price">
        <p>Price :</p>
        <span>{`$ ${reservation.course.price}`}</span>
      </div>
    </div>
  </div>
);

export default Reservation;

Reservation.propTypes = {
  reservation: PropTypes.shape().isRequired,
};
