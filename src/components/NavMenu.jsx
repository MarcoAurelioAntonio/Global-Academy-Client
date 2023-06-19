import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

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
    <div className="nav-container bg-white border h-screen flex flex-col py-40 w-2/6 max-w-fit">
      <div className={`nav_item ${location.pathname === '/' && 'active'}`}>
        <NavLink exact to="/">COURSES</NavLink>
      </div>
      <div className={`nav_item ${location.pathname === '/add-reservation' && 'active'}`}>
        <NavLink to="/add-reservation">ENROLL</NavLink>
      </div>
      <div className={`nav_item ${location.pathname === '/all_user_reservations' && 'active'}`}>
        <NavLink to="/all_user_reservations">MY ENROLLMENTS</NavLink>
      </div>
      <div className={`nav_item ${location.pathname === '/add_course' && 'active'}`}>
        <NavLink to="/add_course">ADD COURSE</NavLink>
      </div>
      <div className={`nav_item ${location.pathname === '/delete_course' && 'active'}`}>
        <NavLink to="/delete_course">DELETE COURSE</NavLink>
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
    </div>
  );
};
export default NavMenu;

NavMenu.propTypes = {
  bgColor: PropTypes.string.isRequired,
  isBacking: PropTypes.bool.isRequired,
  isHide: PropTypes.bool.isRequired,
};
