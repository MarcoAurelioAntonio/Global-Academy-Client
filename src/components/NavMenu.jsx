import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTwitter, faFacebookF, faGoogle, faVimeo, faPinterest,
} from '@fortawesome/free-brands-svg-icons';

import './navMenuFooter.css';
import global from '../assets/images/global.png';

const NavMenu = ({ bgColor, isBacking, isHide }) => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(!isHide);
  if (!isOpen) {
    return (
      <button className="burger-button" type="button" onClick={() => setIsOpen(true)}>
        <span
          className={bgColor === 'gray' ? 'material-symbols-outlined hamburger' : 'material-symbols-outlined hamburger green'}
        >
          menu
        </span>
      </button>
    );
  }
  return (
    <div className="nav-container">
      <div className="imgcontainer">
        <img className="avatar" src={global} alt="Logo" />
      </div>
      <div>
        <div className={`nav_item ${location.pathname === '/' && 'active' || 'notActive'}`}>
          <NavLink to="/">COURSES</NavLink>
        </div>
        <div className={`nav_item ${location.pathname === '/add-reservation' && 'active'  || 'notActive'}`}>
          <NavLink to="/add-reservation">ENROLL</NavLink>
        </div>
        <div className={`nav_item ${location.pathname === '/all_user_reservations' && 'active'  || 'notActive'}`}>
          <NavLink to="/all_user_reservations">MY ENROLLMENTS</NavLink>
        </div>
        <div className={`nav_item ${location.pathname === '/add_course' && 'active'  || 'notActive'}`}>
          <NavLink to="/add_course">ADD COURSE</NavLink>
        </div>
        <div className={`nav_item ${location.pathname === '/delete_course' && 'active'  || 'notActive'}`}>
          <NavLink to="/delete_course">DELETE COURSE</NavLink>
        </div>
      </div>
      {
        isBacking ? (
          <button
            type="button"
            className="close-btn"
            onClick={() => setIsOpen(false)}
          >
            <span className="material-symbols-outlined back-btn">
              arrow_left
            </span>
          </button>
        ) : (
          <button
            type="button"
            className="close-btn"
            onClick={() => setIsOpen(false)}
          >
            <span className="material-symbols-outlined back-btn">
              arrow_left
            </span>
          </button>
        )
      }

      <div className="footer">
        <div className="social-icons">
          <a href="https://github.com/MarcoAurelioAntonio/Global-Academy-Client" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faTwitter} />
            <i className="px-2" />
          </a>
          <a href="https://github.com/MarcoAurelioAntonio/Global-Academy-Client" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faFacebookF} />
            <i className="px-2" />
          </a>
          <a href="https://github.com/MarcoAurelioAntonio/Global-Academy-Client" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faGoogle} />
            <i className="px-2" />
          </a>
          <a href="https://github.com/MarcoAurelioAntonio/Global-Academy-Client" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faVimeo} />
            <i className="px-2" />
          </a>
          <a href="https://github.com/MarcoAurelioAntonio/Global-Academy-Client" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faPinterest} />
            <i className="px-2" />
          </a>
        </div>
        <div className="text">
          <span>&copy; 2023 Global Academy</span>
        </div>

      </div>

    </div>
  );
};
export default NavMenu;

NavMenu.propTypes = {
  bgColor: PropTypes.string.isRequired,
  isBacking: PropTypes.bool.isRequired,
  isHide: PropTypes.bool.isRequired,
};
