import { Link } from 'react-router-dom';

const NavMenu = () => (
  <div className="nav-menu">
    <div className="nav-menu-item">
      <Link to="/">Courses</Link>
    </div>
    <div className="nav-menu-item">
      <Link to="/add-reservation">Enrollment</Link>
    </div>
  </div>
);

export default NavMenu;
