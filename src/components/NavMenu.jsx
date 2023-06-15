import { Link } from 'react-router-dom';

const NavMenu = () => (
  <div className="nav-menu">
    <div className="nav-menu-item">
      <Link to="/">Courses</Link>
    </div>
    <div className="nav-menu-item">
      <Link to="/add-reservation">Enroll</Link>
    </div>
    <div className="nav-menu-item">
      <Link to="/all_user_reservations">My Enrollments</Link>
    </div>
  </div>
);

export default NavMenu;
