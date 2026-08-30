import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
import { FiArrowUpRight, FiLayout, FiUser } from "react-icons/fi";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="app-nav">
      <div className="app-nav__inner">
        <Link to="/dashboard" className="brand-mark">
          <span className="brand-mark__symbol"><FiArrowUpRight /></span>
          <span>AI Career<span className="brand-mark__accent"> Twin</span></span>
        </Link>

        <div className="app-nav__links">
          <Link className={location.pathname === "/dashboard" ? "is-active" : ""} to="/dashboard"><FiLayout /> Overview</Link>
          <Link className={location.pathname === "/career-analysis" ? "is-active" : ""} to="/career-analysis">Analysis</Link>
          <Link className={location.pathname === "/career-roadmap" ? "is-active" : ""} to="/career-roadmap">Roadmap</Link>
          <Link className={location.pathname === "/job-match" ? "is-active" : ""} to="/job-match">Job match</Link>
        </div>

        <div className="app-nav__actions">
          <Link className="nav-profile" to="/profile"><FiUser /><span>Profile</span></Link>
          <button className="nav-logout" onClick={logout} title="Log out">
            <FaSignOutAlt />
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;