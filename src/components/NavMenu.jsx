import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

const NavMenu = ({ bgColor }) => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(true);
  if (!isOpen) {
    return (
      <span className={bgColor === 'gray'? "material-symbols-outlined hamburger": "material-symbols-outlined hamburger green"} onClick={() => setIsOpen(true)}>
        menu
      </span>
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
      <div className={`nav_item ${location.pathname === '/delete_course' && 'active'}`}>
        <NavLink to="/delete_course">DELETE COURSE</NavLink>
      </div>
      <div
        className='close-btn'
        onClick={() => setIsOpen(false)}  
      >Closing</div>
    </div>
  );
};
export default NavMenu;
